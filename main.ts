huskylens2.I2CInit()
huskylens2.switchAlgorithm(huskylens2.Algorithm.AlgorithmFallDownRecognition)
basic.forever(function () {
    huskylens2.requestFallDetectionData()
    if (huskylens2.fallDetected()) {
        basic.showIcon(IconNames.No)
    }
})
