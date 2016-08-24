module.exports = class Root {

  constructor (app) {
    this.config = app.get('config');
  }

  json (req, res) {
    return res.json({
      env: this.config.env,
      version: this.config.version
    });
  }

};
