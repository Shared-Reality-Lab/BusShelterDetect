//
//  ViewController.swift
//  SSDMobileNet-CoreML
//
//  Created by GwakDoyoung on 01/02/2019.
//  Copyright © 2019 tucan9389. All rights reserved.
//

import UIKit
import Vision
import CoreMedia
import AVFoundation


class ViewController: UIViewController {
    
    // MARK: - UI Properties
    @IBOutlet weak var videoPreview: UIView!
    @IBOutlet weak var boxesView: DrawingBoundingBoxView!
    
    
    @IBOutlet weak var inferenceLabel: UILabel!
    @IBOutlet weak var etimeLabel: UILabel!
    @IBOutlet weak var fpsLabel: UILabel!
    
    @IBOutlet weak var freqLabel: UILabel!
    
    @IBOutlet weak var confidenceLabel: UILabel!
    
    // MARK - Core ML model
    // YOLOv3(iOS12+), YOLOv3FP16(iOS12+), YOLOv3Int8LUT(iOS12+)
    // YOLOv3Tiny(iOS12+), YOLOv3TinyFP16(iOS12+), YOLOv3TinyInt8LUT(iOS12+)
    // MobileNetV2_SSDLite(iOS12+), ObjectDetector(iOS12+)
    // yolov5n(iOS13+), yolov5s(iOS13+), yolov5m(iOS13+), yolov5l(iOS13+), yolov5x(iOS13+)
    // yolov5n6(iOS13+), yolov5s6(iOS13+), yolov5m6(iOS13+), yolov5l6(iOS13+), yolov5x6(iOS13+)
    // yolov8n(iOS14+), yolov8s(iOS14+), yolov8m(iOS14+), yolov8l(iOS14+), yolov8x(iOS14+)
    
    // **** Set model here:
    lazy var objectDectectionModel = { return try? feb21() }()
    
    // MARK: - Vision Properties
    var request: VNCoreMLRequest?
    var visionModel: VNCoreMLModel?
    var isInferencing = false
    
    // MARK: - AV Property
    var videoCapture: VideoCapture!
    let semaphore = DispatchSemaphore(value: 1)
    var lastExecution = Date()
    
    // MARK: - TableView Data
    var predictions: [VNRecognizedObjectObservation] = []
    
    // MARK - Performance Measurement Property
    private let 👨‍🔧 = 📏()
    
    let speechSynthesizer = AVSpeechSynthesizer()
    var xCoordinateQueue: [CGFloat] = []
    var prevX = 0.0
    var sayDistance = 0
    var timeL = 0
    var numBoundingBox = 0
    var numNotFound = 0
    var speechQueue: [String] = []
    var isSpeechSynthesizing = false
    var shelterDetected = false
    var shelterDetectedFirst = false
    var speechString: String = ""
    var freq = 1.0
    var confidenceThreshold: Float = 0.5
    let maf1 = MovingAverageFilter()
    let maf2 = MovingAverageFilter()
    let maf3 = MovingAverageFilter()
    
    var audioPlayer: AVAudioPlayer?
    
    var boundingBoxBuffer: [CGRect] = []
    
    // MARK: - View Controller Life Cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // setup the model
        setUpModel()
        
        // setup camera
        setUpCamera()
        
        // setup delegate for performance measurement
        👨‍🔧.delegate = self
        
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.videoCapture.start()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.videoCapture.stop()
    }
    
    
    
    @IBAction func sliderDidSlide(_ sender: UISlider) {
        let value = sender.value
        self.freq = Double(value)

        
        if value < 2{
            freqLabel.text = "Less"
        } else if value < 3{
            freqLabel.text = "Norm"
        } else {
            freqLabel.text = "More"
        }
        
    }
    
    @IBAction func thresholdsliderDidSlide(_ sender: UISlider) {
        let value = sender.value
        self.confidenceThreshold = value

        let formattedString = String(format: "%.f%%", value * 100)
        confidenceLabel.text = formattedString

        
    }
    
    // MARK: - Setup Core ML
    func setUpModel() {
        guard let objectDectectionModel = objectDectectionModel else { fatalError("fail to load the model") }
        if let visionModel = try? VNCoreMLModel(for: objectDectectionModel.model) {
            self.visionModel = visionModel
            request = VNCoreMLRequest(model: visionModel, completionHandler: visionRequestDidComplete)
            request?.imageCropAndScaleOption = .scaleFill
        } else {
            fatalError("fail to create vision model")
        }
    }
    
    // MARK: - SetUp Video
    func setUpCamera() {
        videoCapture = VideoCapture()
        videoCapture.delegate = self
        videoCapture.fps = 20
        videoCapture.setUp(sessionPreset: .vga640x480) { success in
            
            if success {
                // add preview view on the layer
                if let previewLayer = self.videoCapture.previewLayer {
                    self.videoPreview.layer.addSublayer(previewLayer)
                    self.resizePreviewLayer()
                }
                
                // start video preview when setup is done
                self.videoCapture.start()
            }
        }
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        resizePreviewLayer()
    }
    
    func resizePreviewLayer() {
        videoCapture.previewLayer?.frame = videoPreview.bounds
    }
}

// MARK: - VideoCaptureDelegate
extension ViewController: VideoCaptureDelegate {
    func videoCapture(_ capture: VideoCapture, didCaptureVideoFrame pixelBuffer: CVPixelBuffer?, timestamp: CMTime) {
        // the captured image from camera is contained on pixelBuffer
        if !self.isInferencing, let pixelBuffer = pixelBuffer {
            self.isInferencing = true
            
            // start of measure
            self.👨‍🔧.🎬👏()
            
            // predict!
            self.predictUsingVision(pixelBuffer: pixelBuffer)
        }
    }
}

extension ViewController {
    func predictUsingVision(pixelBuffer: CVPixelBuffer) {
        guard let request = request else { fatalError() }
        // vision framework configures the input size of image following our model's input configuration automatically
        self.semaphore.wait()
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer)
        try? handler.perform([request])
    }

    // Method for speaking
    func speakString() {
        
        // Retrieve the British English voice.
        let voice = AVSpeechSynthesisVoice(language: "en-GB")
        
        let speechUtterance = AVSpeechUtterance(string: self.speechString)
        speechUtterance.voice = voice
        speechSynthesizer.speak(speechUtterance)

        isSpeechSynthesizing = true
    }
    
    
    // MARK: - Post-processing
    func visionRequestDidComplete(request: VNRequest, error: Error?) {
        self.👨‍🔧.🏷(with: "endInference")
  
        if let predictions = request.results as? [VNRecognizedObjectObservation] {
            // Filter predictions with label 0
            let filteredPredictions = predictions.filter { $0.label == "0" && $0.confidence >= self.confidenceThreshold}

            DispatchQueue.main.async {
                
                self.shelterDetected = !filteredPredictions.isEmpty
                self.boxesView.predictedObjects = filteredPredictions
                
                self.👨‍🔧.🎬🤚()
                
                self.isInferencing = false
                
                // If bus shelter is detected and hasn't been detected before
                if (self.shelterDetected && !self.shelterDetectedFirst){
                    
                    self.numBoundingBox += 1
                    
                    if self.numBoundingBox == 25 {
                        
                        self.numBoundingBox = 0
                        let box = filteredPredictions[0].boundingBox
                        let height = box.height
 
                        self.speechString = "Detected"
                        self.speakString()
     
                        self.speechString = "\(round(1/height)) meters"
                        self.speakString()
                        
                        self.shelterDetectedFirst = true

                    }
                }
                
                // If bus shelter is detected and has been detected before
                else if self.shelterDetected && self.shelterDetectedFirst{
                    self.timeL = self.timeL + 1
                    
                    if (self.timeL > 60 / Int(self.freq)){
                        let box = filteredPredictions[0].boundingBox
                        
                        print("confidence \(filteredPredictions[0].confidence)")
                        
                        self.updateBoundingBoxBuffer(with: box)
                        let average = self.calculateAverageBoundingBox()
                        
                        self.numBoundingBox += 1
                        
                        if self.numBoundingBox == 15 {
                            
                            self.numBoundingBox = 0
                            
                            let xPos = average.avgX
                            let height = average.avgHeight
                            
                            print("Heightx \(height)")
                            
                            // Determine quadrant for navigation (clock direction)
                            if xPos < 0.2{
                                self.speechString = "10"
                                self.speakString()
                                
                                let generator = UIImpactFeedbackGenerator(style: .heavy)
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    generator.impactOccurred()
                                }

                                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                    generator.impactOccurred()
                                }
                                
                            }
                            else if xPos > 0.2 && xPos < 0.4{
                                self.speechString = "11"
                                self.speakString()
                                
                                let generator = UIImpactFeedbackGenerator(style: .heavy)
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    generator.impactOccurred()
                                }

                                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                    generator.impactOccurred()
                                }
                                
                            }
                            else if xPos > 0.4 && xPos < 0.6 {
//                                self.speechString = "Straight"
//                                self.speakString()
                                self.playBeepSound()
                                
                                let generator = UIImpactFeedbackGenerator(style: .heavy)
                                generator.impactOccurred()
                                
                            }
                            else if xPos > 0.6 && xPos < 0.8{
                                self.speechString = "1"
                                self.speakString()
                                
                                let generator = UIImpactFeedbackGenerator(style: .heavy)
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    generator.impactOccurred()
                                }

                                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                    generator.impactOccurred()
                                }
                                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                                    generator.impactOccurred()
                                }
                                
                            }
                            
                            else if xPos > 0.8{
                                self.speechString = "2"
                                self.speakString()
                                
                                let generator = UIImpactFeedbackGenerator(style: .heavy)
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    generator.impactOccurred()
                                }

                                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                    generator.impactOccurred()
                                }
                                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                                    generator.impactOccurred()
                                }
                                
                            }
                            
                            if self.sayDistance == 3 {
                                self.speechString = "\(round(1/height)) meters"
                                self.speakString()
                                self.sayDistance = 0
                            }
 
                            self.timeL = 0
                            self.prevX = xPos
                            self.sayDistance += 1
        
                        }
                    }
                }
                
                // If bus shelter is no longer detected
                if !self.shelterDetected && self.shelterDetectedFirst{
                    self.numNotFound += 1
                    self.numBoundingBox -= 1
                    if self.numNotFound == 40 {
                        
                        self.speechString = "Lost"
                        self.speakString()
                        
//                        let average = self.calculateAverageBoundingBox()
//                        let averageX = average.avgX
//
//                        if averageX < 0.4 {
//                            self.speechString = "Hard left"
//                            self.speakString()
//
//                        } else if averageX > 0.6{
//                            self.speechString = "Hard right"
//                            self.speakString()
//                        }
                        
                        
                        
                        self.shelterDetectedFirst = false
                        
                        self.numNotFound = 0
                        self.numBoundingBox = 0
                        
                    }
                }
                
            }
        } else {
            // end of measure
            self.👨‍🔧.🎬🤚()
            
            self.isInferencing = false
        }
        self.semaphore.signal()
        
        
    }
    func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        isSpeechSynthesizing = false
        speakString()
    }
    
    func updateBoundingBoxBuffer(with newBox: CGRect) {
        boundingBoxBuffer.append(newBox)
        if boundingBoxBuffer.count > 4 {
            boundingBoxBuffer.removeFirst()
            boundingBoxBuffer.removeFirst()
            boundingBoxBuffer.removeFirst()
            boundingBoxBuffer.removeFirst()
        }
    }
    
    func playBeepSound() {
        guard let soundURL = Bundle.main.url(forResource: "beep-23", withExtension: "mp3") else {
            print("Beep sound file not found")
            return
        }
        
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: soundURL)
            audioPlayer?.prepareToPlay()
            audioPlayer?.play()
        } catch let error {
            print("Error playing sound: \(error.localizedDescription)")
        }
    }
    
    func playSucess() {
        guard let soundURL = Bundle.main.url(forResource: "success", withExtension: "mp3") else {
            print("Beep sound file not found")
            return
        }
        
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: soundURL)
            audioPlayer?.prepareToPlay()
            audioPlayer?.play()
        } catch let error {
            print("Error playing sound: \(error.localizedDescription)")
        }
    }
    
    // Function to calculate average bounding box
    func calculateAverageBoundingBox() -> (avgX: CGFloat, avgHeight: CGFloat) {
            guard !boundingBoxBuffer.isEmpty else {
                return (0, 0)
            }

            let sum = boundingBoxBuffer.reduce((totalMiddleX: CGFloat(0), totalHeight: CGFloat(0))) { (currentSum, box) in
                let middleX = (box.minX + box.maxX) / 2.0 // Calculate middle X for each box
                let height = box.maxY - box.minY // Calculate height for each box
                return (currentSum.totalMiddleX + middleX, currentSum.totalHeight + height)
            }

            let count = CGFloat(boundingBoxBuffer.count)
            let avgMiddleX = sum.totalMiddleX / count // Average middle X
            let avgHeight = sum.totalHeight / count // Average height

            return (avgMiddleX, avgHeight)
    }
    
    
    
    
}

extension ViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return predictions.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "InfoCell") else {
            return UITableViewCell()
        }
        
        let rectString = predictions[indexPath.row].boundingBox.toString(digit: 2)
        let confidence = predictions[indexPath.row].labels.first?.confidence ?? -1
        let confidenceString = String(format: "%.3f", confidence/*Math.sigmoid(confidence)*/)
        
        cell.textLabel?.text = predictions[indexPath.row].label ?? "N/A"
        cell.detailTextLabel?.text = "\(rectString), \(confidenceString)"
        return cell
    }
}

// MARK: - 📏(Performance Measurement) Delegate
extension ViewController: 📏Delegate {
    func updateMeasure(inferenceTime: Double, executionTime: Double, fps: Int) {
        //print(executionTime, fps)
        DispatchQueue.main.async {
            self.maf1.append(element: Int(inferenceTime*1000.0))
            self.maf2.append(element: Int(executionTime*1000.0))
            self.maf3.append(element: fps)
            
            self.inferenceLabel.text = "inference: \(self.maf1.averageValue) ms"
            self.etimeLabel.text = "execution: \(self.maf2.averageValue) ms"
            self.fpsLabel.text = "fps: \(self.maf3.averageValue)"
        }
    }
}

class MovingAverageFilter {
    private var arr: [Int] = []
    private let maxCount = 10
    
    public func append(element: Int) {
        arr.append(element)
        if arr.count > maxCount {
            arr.removeFirst()
        }
    }
    
    public var averageValue: Int {
        guard !arr.isEmpty else { return 0 }
        let sum = arr.reduce(0) { $0 + $1 }
        return Int(Double(sum) / Double(arr.count))
    }
}


