// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let inputJson = document.getElementById('jsonFile')

function autoFill(tabs, jsonValue) {
  Object.entries(jsonValue).forEach(function (items) {
    let key = items[0];
    let values = Array.isArray(items[1]) ? items[1] : [items[1]];
    values.forEach(function (value, index) {
      let code = 'var autoFillInput = document.getElementsByName("' + key + '")[' + index + '];';
      code += 'if (autoFillInput.tagName === "SELECT") { autoFillInput.selectedIndex = "' + value + '";}';
      code += 'else if (autoFillInput.type === "checkbox") { autoFillInput.checked = "' + value + '" === "true";}';
      code += 'else { autoFillInput.value = "' + value + '"; };';
      console.log(code);
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: code}
      );
    })
  });
}

inputJson.onchange = function() {
  let file = inputJson.files[0]
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      let jsonValue = JSON.parse(evt.target.result)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        autoFill(tabs, jsonValue)
      });
    }
  }
};
