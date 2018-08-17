var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
var base64Img = require("base64-img");

/* GET home page. */

router.get("/", function(req, res, next) {
  //   var list = [], options = []; let correctOpt = 0; let OptionNumber = 0;
  //   $('div[id="question_basic"]')
  //     .find("div > .question_text ")
  //     .each(function(index, element) {
  //       list.push($(element).text());

  //       console.log( $(element).html().trim() );
  //       $(this).parent().find('div > table > tbody > tr >  .option_text').each(function(i, elemt) {
  //         OptionNumber++;
  //         console.log(OptionNumber, $(elemt).text().trim() );
  //         $(this).parent().find('.q_tbl_optn_col_1 > i').each(function(i3, e3) {
  //             console.log( 'Correct Opt : ',OptionNumber,  $(e3).attr('data-original-title').trim() );
  //         });
  //     });

  //     if( $(this).parent().find('.explanation_text').children().first().text().trim().length > 0 ) {
  //         console.log( $(this).parent().find('.explanation_text').children().first().html().trim() );
  //     } else {
  //         console.log( $(this).parent().find('.explanation_text').html().trim() );
  //     }

  //     // console.log( $(this).parent().find('.explanation_text').children().first().text() );
  //     OptionNumber = 0;
  //     });
  res.render("index", { title: "Express" });
});

router.post("/", function(req, res, next) {
  // console.log("RUNNING POST METHOD");
  // const $ = cheerio.load( req.body.content );

  var QUESTION = "";
  var OPTIONS = [];
  var correctOpt = 0;
  var OptionNumber = 0;
  var EXPLANATION = "";
  var CombinedArray = [];

  let BASEHTML = cheerio.load(  req.body.content  );

  var promises = [];

  var DECODE_IMAGE = new Promise((resolve, reject) => {
    var x = BASEHTML("img").each(function() {
      var old_src = BASEHTML(this).attr("src");
       var promise = BASE_64_CONVERTER(old_src).then(data => {
        if( BASEHTML(this).attr("src", data) ) {
          console.log('changed');
          console.log(BASEHTML(this).attr() );
        } else {
          console.log('not changed');
        }
        // return resolve(BASEHTML);
      }, (error) => {
        return reject();
      });
      promises.push(promise); 
      // return resolve(BASEHTML);
    });
      return resolve(BASEHTML);

  });

  var EXTRACT_INFO = new Promise((resolve, reject) => {
    BASEHTML('.question_basic').find("div > .question_text ").each(function(index, element) {
        // list.push(BASEHTML(element).html());
        QUESTION = BASEHTML(element).html();

        BASEHTML(this).parent().find('div > table > tbody > tr >  .option_text').each(function(i, elemt) {
            OptionNumber++;
            let ch =  BASEHTML(this).parent().find('.q_tbl_optn_col_1 > i').each(function(i3, e3) {
                //   console.log( 'Correct Opt : ',OptionNumber,  BASEHTML(e3).attr('data-original-title').trim() );
                // This is correct option detected
            });
            if(ch == '') {
                OPTIONS.push({  opt: BASEHTML(elemt).text().trim(), is_correct: 0,  });
            } else {
                OPTIONS.push({ opt: BASEHTML(elemt).text().trim(), is_correct: 1, });
            }
        });

        if( BASEHTML(this).parent().find('.explanation_text').children().first().text().trim().length > 0 ) {
            // if multiple tags are used there
            EXPLANATION = BASEHTML(this).parent().find('.explanation_text').children().first().html().trim();
        } else {
            // if it has only explanation
            EXPLANATION = BASEHTML(this).parent().find('.explanation_text').html().trim();
        }


        var temp_sub_document = {
                question: QUESTION.toString().split('"').join("'"),
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
    console.log(data, "\n", BASEHTML);
    res.send( BASEHTML.html() );
  })
})
  // var myExtraction = Promise.all([DECODE_IMAGE, EXTRACT_INFO]);
  // myExtraction.then(data => {
  //   res.send( JSON.stringify(CombinedArray) );
  // });

});



var BASE_64_CONVERTER = function(old_src) {
  return new Promise(function(resolve, reject) {
    base64Img.requestBase64(old_src, function(err, res, base64data) {
      if (err) {
        console.log(err);
      } else {
        return resolve(base64data);
      }
    });
  });
};

module.exports = router;
