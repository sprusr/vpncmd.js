'use strict'

const Promise = require("bluebird")
const exec = Promise.promisify(require("child_process").exec)
const Converter = require("csvtojson").Converter
const camelCase = require("camelcase")

var VPNCMD = function(options) {
  this.options = options
}

VPNCMD.prototype.getBaseCommand = function() {
  let opts = this.options
  return `${opts.bin} ${opts.address}:${opts.port} /SERVER /HUB:${opts.hub} /PASSWORD:${opts.password} /CSV /CMD `
}

VPNCMD.prototype.executeCommand = function(command) {
  let cmd = `${this.getBaseCommand()} ${command}`
  return exec(cmd).then(csvToJson)
}

var csvToJson = function(csvString) {
  return new Promise((resolve, reject) => {
    if(csvString.match(/^Item,Value/)) {
      let lines = csvString.split("\n"), json = {}, keyValue = [], splitIndex

      for(var i = 1; i < lines.length; i++) {
        splitIndex = lines[i].indexOf(',')
        keyValue = [lines[i].slice(0, splitIndex), lines[i].slice(splitIndex + 1)]
        json[camelCase(keyValue[0])] = keyValue[1]
      }

      resolve(json)
    } else {
      let converter = new Converter()

      converter.transform = (json, row, index) => {
        for(var i in json) {
          json[camelCase(i)] = json[i]
          delete json[i]
        }
      }

      converter.fromString(csvString, (err, json) => {
        if(err) {
          reject(err)
        } else {
          resolve(json)
        }
      })
    }
  })
}

module.exports = VPNCMD
