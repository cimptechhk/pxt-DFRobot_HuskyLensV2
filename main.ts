smarthonIoTBit.onWifiConnect(function (ipAddress, deviceId) {
    basic.showIcon(IconNames.Yes)
    OLED.writeStringNewLine("Device ID: " + deviceId)
})
input.onButtonPressed(Button.A, function () {
    SmartCity.turn_servo(90, AnalogPin.P1)
})
smarthonIoTBit.onThingspeakConn(function (status, errorCode) {
    OLED.clear()
    OLED.writeStringNewLine("Status: " + status)
    OLED.writeStringNewLine("Error: " + errorCode)
})
input.onButtonPressed(Button.B, function () {
    SmartCity.turn_servo(180, AnalogPin.P1)
})
OLED.init(128, 64)
smarthonIoTBit.initializeWifi(SerialPin.P16, SerialPin.P8)
smarthonIoTBit.setWifi("FWIOT24", "Y@nShing3")
huskylensV2.I2CInit()
huskylensV2.switchAlgorithm(huskylensV2.Algorithm.ALGORITHM_LICENSE_RECOGNITION)
basic.forever(function () {
    if (smarthonIoTBit.isWifiConnect()) {
        huskylensV2.getResultPlateRecogtion()
    }
})
