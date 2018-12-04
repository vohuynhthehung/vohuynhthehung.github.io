document.getElementById('button').addEventListener('click', () => {
  let settingsData = JSON.parse(document.getElementById('input').value);

  let presets = settingsData.presets || {},
      current = settingsData.current,
      currentKey = Object.keys(current),
      newPresets = {},
      result = {};

  if(Object.keys(presets).length > 0) {
    Object.keys(presets).map((item, index) => {
      newPresets[item] = {};
      currentKey.map((key, i) => {
        if(key.indexOf(item) > -1) {
          newPresets[item][key] = current[key];
        }
      })
    })

    result = {
      current,
      presets: newPresets
    }
    document.getElementById('output').value = JSON.stringify(result);
  }
})

