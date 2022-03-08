const router = require("express").Router();
const fs = require("fs");

router.get("/checkauth", async (req, res) => {
  client
    .getState()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      if (err) {
        res.send("DISCONNECTED! : ", err);
      }
    });
});

router.get("/getqr", (req, res) => {
  var qrjs = fs.readFileSync("components/qrcode.js");
  fs.readFile("components/last.qr", "utf8", (err, last_qr) => {
    if (err) {
      console.log(err);
    }
    console.log("bonjour");
    var page = `
                <html>
                    <body>
                        <script>${qrjs}</script>
                        <div>${last_qr}</div>
                        <div id="qrcode"></div>
                        <script type="text/javascript">
                            new QRCode(document.getElementById("qrcode"), "${last_qr}");
                            
                        </script>
                    </body>
                </html>
                `;
    res.write(page);
    res.end();
  });
});

module.exports = router;
