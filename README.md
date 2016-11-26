# vpncmd.js

Allows you to manage SoftEther VPN servers using JavaScript. Based on [oatazelmasry2/softether.js](https://github.com/moatazelmasry2/softether.js). Requires a local VPNCMD installation.

## Getting started

```shell
npm install --save vpncmd
```

```javascript
const VPNCMD = require("vpncmd")
const vpncmd = new VPNCMD({
  bin: "/usr/local/vpnclient/vpncmd",
  address: "localhost",
  port: "443",
  password: "",
  hub: ""
})

vpncmd.executeCommand("UserList").then((users) => {
  console.log(users)
})
```

## Roadmap

Currently there are plans to add wrapper functions for frequently used VPNCMD commands. There are also plans for better csv parsing support.

Pull requests are welcomed!
