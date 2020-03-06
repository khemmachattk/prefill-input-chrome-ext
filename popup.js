// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let inputJson = document.getElementById('jsonFile')
let submitG1 = document.getElementById('submitG1')
let submitG2 = document.getElementById('submitG2')
let submitG3 = document.getElementById('submitG3')
let submitG4 = document.getElementById('submitG4')

function autoFill2(tabs, jsonValue, random = 1) {
  let code = 'var autofill_mainIFrame = document.querySelector("iframe[name=\'iframe_a\']");console.log(autofill_mainIFrame);';
  code += 'var autofill_mainForm;';
  code += 'try { autofill_mainForm = autofill_mainIFrame.contentWindow.document.getElementById("f_reserve") }';
  code += 'catch (e) { autofill_mainForm = document.getElementById("f_reserve") };console.log(autofill_mainForm);'
  code += 'var textInputs = autofill_mainForm.querySelectorAll("input[type=\'text\']");console.log(textInputs);';
  code += 'var selectInputs = autofill_mainForm.querySelectorAll("select");console.log(selectInputs);';
  code += 'selectInputs[0].selectedIndex = "' + jsonValue['gender'] + '";';
  code += 'selectInputs[1].selectedIndex = "' + jsonValue['car_type'] + '";';
  if (random == 1) {
    code += 'textInputs[0].value = "' + jsonValue['fname'] + '";';
    code += 'textInputs[1].value = "' + jsonValue['lname'] + '";';
    code += 'textInputs[2].value = "' + jsonValue['id_card'] + '";';
    code += 'textInputs[3].value = "' + jsonValue['car_box'] + '";';
    code += 'textInputs[4].value = "' + jsonValue['phone'] + '";';
    code += 'textInputs[5].value = "' + jsonValue['number'] + '";';
  } else if (random == 2) {
    code += 'textInputs[0].value = "' + jsonValue['id_card'] + '";';
    code += 'textInputs[1].value = "' + jsonValue['fname'] + '";';
    code += 'textInputs[2].value = "' + jsonValue['lname'] + '";';
    code += 'textInputs[3].value = "' + jsonValue['phone'] + '";';
    code += 'textInputs[4].value = "' + jsonValue['car_box'] + '";';
    code += 'textInputs[5].value = "' + jsonValue['number'] + '";';
  } else if (random == 3) {
    code += 'textInputs[0].value = "' + jsonValue['id_card'] + '";';
    code += 'textInputs[1].value = "' + jsonValue['fname'] + '";';
    code += 'textInputs[2].value = "' + jsonValue['lname'] + '";';
    code += 'textInputs[3].value = "' + jsonValue['car_box'] + '";';
    code += 'textInputs[4].value = "' + jsonValue['phone'] + '";';
    code += 'textInputs[5].value = "' + jsonValue['number'] + '";';
  } else if (random == 4) {
    code += 'textInputs[0].value = "' + jsonValue['fname'] + '";';
    code += 'textInputs[1].value = "' + jsonValue['lname'] + '";';
    code += 'textInputs[2].value = "' + jsonValue['id_card'] + '";';
    code += 'textInputs[3].value = "' + jsonValue['phone'] + '";';
    code += 'textInputs[4].value = "' + jsonValue['car_box'] + '";';
    code += 'textInputs[5].value = "' + jsonValue['number'] + '";';
  }
  console.log(code);
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: code}
  );
}

function gReader(random) {
  let file = inputJson.files[0]
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      let jsonValue = JSON.parse(evt.target.result)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        autoFill2(tabs, jsonValue, random)
      });
    }
  }
};

submitG1.onclick = function() {
  gReader(1)
}

submitG2.onclick = function() {
  gReader(2)
}

submitG3.onclick = function() {
  gReader(3)
}

submitG4.onclick = function() {
  gReader(4)
}
