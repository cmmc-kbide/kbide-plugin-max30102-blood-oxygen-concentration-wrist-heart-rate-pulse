Blockly.JavaScript['heart_rate_max30102_begin'] = function(block) {
  var variable_heart_rate_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('HEART_RATE_INSTANCE'), Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = `
  #EXTINC
  #include <Wire.h>
  #END
  #EXTINC
  #include "MAX30105.h"
  #END
  #EXTINC
  #include "heartRate.h"
  #END

  #VARIABLE
  MAX30105 ${variable_heart_rate_instance};
  const byte ${variable_heart_rate_instance}_RATE_SIZE = 4;
  byte ${variable_heart_rate_instance}_rates[${variable_heart_rate_instance}_RATE_SIZE];
  byte ${variable_heart_rate_instance}_rateSpot = 0;
  long ${variable_heart_rate_instance}_lastBeat = 0;
  float ${variable_heart_rate_instance}_beatsPerMinute;
  int ${variable_heart_rate_instance}_beatAvg;
  bool ${variable_heart_rate_instance}_finger_detect = false;
  bool ${variable_heart_rate_instance}_heart_beat_detect = false;
  #END

  #SETUP
  ${variable_heart_rate_instance}.begin(Wire, I2C_SPEED_FAST);
  ${variable_heart_rate_instance}.setup();
  ${variable_heart_rate_instance}.setPulseAmplitudeRed(0x0A);
  #END
  `;
  return code;
};

Blockly.JavaScript['heart_rate_max30102_heart_beat_per_minute'] = function(block) {
  var variable_heart_rate_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('HEART_RATE_INSTANCE'), Blockly.Variables.NAME_TYPE);
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = `
  long ${variable_heart_rate_instance}_irValue = ${variable_heart_rate_instance}.getIR();

  if (${variable_heart_rate_instance}_irValue > 7000) { // If a finger is detected
    if (checkForBeat(${variable_heart_rate_instance}_irValue) == true) // If a heart beat is detected
    {
      ${variable_heart_rate_instance}_heart_beat_detect = true;
      // ${dropdown_name}.print("heart beat is detected / ");
      ${dropdown_name}.print("BMP : ");
      ${dropdown_name}.println(${variable_heart_rate_instance}_beatAvg);

      delay(100);

      //We sensed a beat!
      long ${variable_heart_rate_instance}_delta = millis() - ${variable_heart_rate_instance}_lastBeat; //Measure duration between two beats
      ${variable_heart_rate_instance}_lastBeat = millis();

      ${variable_heart_rate_instance}_beatsPerMinute = 60 / (${variable_heart_rate_instance}_delta / 1000.0);           //Calculating the BPM

      if (${variable_heart_rate_instance}_beatsPerMinute < 255 && ${variable_heart_rate_instance}_beatsPerMinute > 20)               //To calculate the average we strore some values (4) then do some math to calculate the average
      {
        ${variable_heart_rate_instance}_rates[${variable_heart_rate_instance}_rateSpot++] = (byte)${variable_heart_rate_instance}_beatsPerMinute; //Store this reading in the array
        ${variable_heart_rate_instance}_rateSpot %= ${variable_heart_rate_instance}_RATE_SIZE; //Wrap variable

        //Take average of readings
        ${variable_heart_rate_instance}_beatAvg = 0;
        for (byte x = 0 ; x < ${variable_heart_rate_instance}_RATE_SIZE ; x++)
        ${variable_heart_rate_instance}_beatAvg += ${variable_heart_rate_instance}_rates[x];
        ${variable_heart_rate_instance}_beatAvg /= ${variable_heart_rate_instance}_RATE_SIZE;
      }
    } else {
      if (${variable_heart_rate_instance}_heart_beat_detect == false) {
        ${dropdown_name}.println("Please Hold your finger");
      }
    }
  } else {
    ${variable_heart_rate_instance}_heart_beat_detect = false;
    ${dropdown_name}.println("Please Place your finger");
  }
  `;
  return code;
}