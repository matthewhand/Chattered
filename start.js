module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          HIP_VISIBLE_DEVICES: "0",
          HSA_OVERRIDE_GFX_VERSION: "11.5.1",
          PYTORCH_HIP_ALLOC_CONF: "expandable_segments:True",
          ROC_ENABLE_PRE_VEGA: "1"
        },
        path: "app",
        message: [
          "python chattered.py",
        ],
        on: [{
          "event": "/http:\\/\\/[^=\\s]+/",   
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
