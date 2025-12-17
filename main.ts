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
let CenterLicenseNo = 0
let CenterLicenseID = 0
let TotalLicenses = 0
OLED.init(128, 64)
smarthonIoTBit.initializeWifi(SerialPin.P16, SerialPin.P8)
smarthonIoTBit.setWifi("FWIOT24", "Y@nShing3")
huskylensV2.I2CInit()
huskylensV2.switchAlgorithm(huskylensV2.Algorithm.ALGORITHM_LICENSE_RECOGNITION)
basic.forever(function () {
    if (smarthonIoTBit.isWifiConnect()) {
        huskylensV2.getResultPlateRecogtion()
        TotalLicenses = huskylensV2.getCachedResultNumPlate()
        CenterLicenseID = huskylensV2.getCachedCenterPlateResult(huskylensV2.PlateProperty.ID)
        CenterLicenseNo = huskylensV2.getCachedCenterPlateResult(huskylensV2.PlateProperty.Content)
        if (huskylensV2.availablePlateRecogtion()) {
            OLED.clear()
            basic.showNumber(TotalLicenses)
            OLED.writeStringNewLine("Total Licenses: " + TotalLicenses)
            OLED.writeStringNewLine("Center License ID: " + CenterLicenseID)
            OLED.writeStringNewLine("Center License No: " + CenterLicenseNo)
            if (CenterLicenseID == -1 || CenterLicenseID == 0) {
                OLED.writeStringNewLine("Gate Status: " + "Access Denied")
                SmartCity.turn_servo(180, AnalogPin.P1)
            } else {
                OLED.writeStringNewLine("Gate Status: " + "Opening...")
                music.play(music.tonePlayable(262, music.beat(BeatFraction.Breve)), music.PlaybackMode.InBackground)
                SmartCity.turn_servo(90, AnalogPin.P1)
                basic.pause(3000)
                SmartCity.turn_servo(180, AnalogPin.P1)
            }
            smarthonIoTBit.sendThingspeak(
            "WRQN2R7OMIMHQVDL",
            TotalLicenses,
            CenterLicenseID
            )
            basic.pause(12000)
        }
    }
})
