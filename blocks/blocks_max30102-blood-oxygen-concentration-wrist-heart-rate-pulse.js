Blockly.Blocks['heart_rate_max30102_begin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("HEART_RATE_MX20102", null, ["Plugin.HEART_RATE"], ["Plugin.HEART_RATE"]), "HEART_RATE_INSTANCE")
        .appendField("HEART RATE BEGIN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['heart_rate_max30102_heart_beat_per_minute'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("HEART_RATE_MX20102", null, ["Plugin.HEART_RATE"], ["Plugin.HEART_RATE"]), "HEART_RATE_INSTANCE")
        .appendField("HEART RATE PER MINUTE");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["SERIAL","Serial"], ["SERIAL1","Serial1"], ["SERIAL2","Serial2"]]), "NAME")
        .appendField("SERIAL DISPLAY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};