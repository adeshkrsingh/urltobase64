var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
var base64Img = require("base64-img");
const IMAGE_DOWNLOADER = require('image-downloader')
var request = require('request').defaults({ encoding: null });


/* GET home page. */

router.get("/", function (req, res, next) {

  res.render("index", { title: "Express" });
});







router.post("/", function (req, res, next) {
  console.log("RUNNING POST METHOD");
  // const $ = cheerio.load( req.body.content );

  var QUESTION = "";
  var OPTIONS = [];
  var correctOpt = 0;
  var OptionNumber = 0;
  var EXPLANATION = "";
  var CombinedArray = [];

  let BASEHTML = cheerio.load(req.body.content);



  var promises = [];


  var DECODE_IMAGE = new Promise((resolve, reject) => {
    var x = BASEHTML("img").each(function () {
      var old_src = BASEHTML(this).attr("src");

      var  promise = BASE_64_CONVERTER(old_src).then(data => {
        console.log('DATA :', data)
        return promises.push( BASEHTML(this).attr("src", data) );
        // if (BASEHTML(this).attr("src", data)) {
        //   console.log('changed');
        //   // console.log(BASEHTML(this).attr() );
        //   promises.push(getJSONData(false,i));
        // } else {
        //   console.log('not changed');
        // }
        // return resolve(BASEHTML);
      }, (error) => {
        return reject();
      });

      
    });
    resolve(BASEHTML);

  });

  var EXTRACT_INFO = new Promise((resolve, reject) => {
    BASEHTML('.question_basic').find("div > .question_text ").each(function (index, element) {
      // list.push(BASEHTML(element).html());
      QUESTION = BASEHTML(element).html();

      BASEHTML(this).parent().find('div > table > tbody > tr >  .option_text').each(function (i, elemt) {
        OptionNumber++;
        let ch = BASEHTML(this).parent().find('.q_tbl_optn_col_1 > i').each(function (i3, e3) {
          console.log('Correct Opt : ', OptionNumber, BASEHTML(e3).attr('data-original-title').trim());
          // This is correct option detected
        });
        if (ch == '') {
          OPTIONS.push({ opt: BASEHTML(elemt).text().trim(), is_correct: 0, });
        } else {
          OPTIONS.push({ opt: BASEHTML(elemt).text().trim(), is_correct: 1, });
        }
      });

      if (BASEHTML(this).parent().find('.explanation_text').children().first().text().trim().length > 0) {
        // if multiple tags are used there
        EXPLANATION = BASEHTML(this).parent().find('.explanation_text').children().first().html().trim();
      } else {
        // if it has only explanation
        EXPLANATION = BASEHTML(this).parent().find('.explanation_text').html().trim();
      }


      var temp_sub_document = {
        question: "<code>" + QUESTION.toString().split('"').join("'") + "</code>",
        options: OPTIONS,
        explanation: EXPLANATION.toString().split('"').join("'"),
      };


      CombinedArray.push(temp_sub_document);

      QUESTION = "";
      options = [];
      explanation = "";
      EXPLANATION = "";
      OPTIONS = [];
    });
    return resolve();
  });

  Promise.all(promises).then(() => {


    DECODE_IMAGE.then((data) => {
      // res.send( BASEHTML.html() );
      res.render('display_json', { data: JSON.stringify(CombinedArray) })
    })
  })
  // var myExtraction = Promise.all([DECODE_IMAGE, EXTRACT_INFO]);
  // myExtraction.then(data => {
  //   res.send( JSON.stringify(CombinedArray) );
  // });

});



var BASE_64_CONVERTER = function (old_src) {
  return new Promise(function (resolve, reject) {
    // base64Img.requestBase64(old_src, function(err, res, base64data) {
    //   if (err) {
    //     // console.log(err);
    //   } else {
    //     // console.log(res);
    //     return resolve(base64data);
    //   }
    // });

    request.get(old_src, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        // console.log("#####################################", data);
        console.log('Resolved Image')
        return resolve(data);
      } else {
        console.log('Rejected Image')
        return reject(old_src);
      }
    });
  });
};

module.exports = router;
