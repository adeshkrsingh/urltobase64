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




/* GET home page. */

router.get("/tp-simple-question", function (req, res, next) {
  res.render("fetch/tp_simple_question", { title: "Express" });
});


router.post("/tp-simple-question", function (req, res, next) {

    var QUESTION = "";
    var PARAGRAPH_TEXT = "";
    var OPTIONS = [];
    var OptionNumber = 0;
    var EXPLANATION = "";
    var CombinedArray = [];
    var ImageSrcArray = [];

    var t = (req.body.tagsInput);
    var tags = t.toString().split(',');
    var tagsObject = [];

    console.log(req.body['tags'])

    var j = 0;
      if (tags !== undefined) {
          tags.forEach(function (value) {
              tagsObject[j] = {};
              if (value === undefined) {
                  // to be handled by default value
              }
              else {
                  tagsObject[j]['tag_text'] = value;
              }
              j++;
          });
      }

    let BASEHTML = cheerio.load((req.body.content) );

    BASEHTML("img").each( async function () {
      var old_src = BASEHTML(this).attr("src");
      ImageSrcArray.push(old_src);
    });
    async function f() {
      let promiseSee = await Promise.all(ImageSrcArray.map(async img => {
        let decodedImage = await BASE_64_CONVERTER(img);
        BASEHTML = cheerio.load( BASEHTML.html().toString().replace(img, decodedImage) );
        return decodedImage;
      })
      );
    }

    f().then((result1)=> {
    var EXTRACT_INFO = new Promise((resolve, reject) => {

      /* Extracting Each Questions One by One */
      BASEHTML('.question_basic').find("div > .question_text ").each(function (index, element) {
        QUESTION = BASEHTML(element).html();

        /* Extracting Options associated with each question */
        var correctOptionCounter = 0;
        var is_multicorrect = 0;
        BASEHTML(this).parent().find('div > table > tbody > tr >  .option_text').each(function (i, elemt) {
          OptionNumber++;
          let ch = BASEHTML(this).parent().find('.q_tbl_optn_col_1 > i').each(function (i3, e3) {
            // console.log('Correct Opt : ', OptionNumber, BASEHTML(e3).attr('data-original-title').trim());
            // This is correct option detected
          });
          if (ch == '') {
            OPTIONS.push({ option_text: BASEHTML(elemt).text().trim(), is_correct: false, });
          } else {
            OPTIONS.push({ option_text: BASEHTML(elemt).text().trim(), is_correct: true, });
            correctOptionCounter++;
          }
        });
        /* / Extracting Options associated with each question */

        /* Checking for multicorrect option */
        if(correctOptionCounter > 1) {
          is_multicorrect = 1;
        }
        /* / Checking for multicorrect option */


        /* Extracting explanation from each question */
        if (BASEHTML(this).parent().find('.explanation_text').children().first().text().trim().length > 0) {
          // if multiple tags are used there
          EXPLANATION = BASEHTML(this).parent().find('.explanation_text').children().first().html().trim();
        } else {
          // if it has only explanation
          EXPLANATION = BASEHTML(this).parent().find('.explanation_text').html().trim();
        }
        /* / Extracting explanation from each question */


        console.log(tagsObject);
        var temp_sub_document = {
          question_text:  QUESTION.toString().split('"').join("'").replace(/\n/g, " ") ,
          options: OPTIONS,
          tags: tagsObject,
          status: 'draft',
          paragraph_text: PARAGRAPH_TEXT.toString().split('"').join("'").replace(/\n/g, " ") ,
          multicorrect: is_multicorrect,
          explanation: EXPLANATION.toString().split('"').join("'").replace(/\n/g, " ") ,
        };


        CombinedArray.push(temp_sub_document);

        QUESTION = "";
        options = [];
        explanation = "";
        EXPLANATION = "";
        OPTIONS = [];
      });

      /* / Extracting Each Questions One by One */
      return resolve();
    });

  }).then((result2)=> {

    res.render('display_json', { data: JSON.stringify(CombinedArray) });

  });


});














router.get("/tp-paragraph-question", function (req, res, next) {
  res.render("fetch/tp_paragraph_question", { title: "Express" });
});

router.post("/tp-paragraph-question", function (req, res, next) {

  var QUESTION = "";
  var PARAGRAPH_TEXT = "";
  var OPTIONS = [];
  var OptionNumber = 0;
  var EXPLANATION = "";
  var CombinedArray = [];
  var ImageSrcArray = [];

  var tags = req.body.tags;
    var tagsObject = [];

  var j = 0;
    if (tags !== undefined) {
        tags.forEach(function (value) {
            tagsObject[j] = {};
            if (value === undefined) {
                // to be handled by default value
            }
            else {
                tagsObject[j]['tag_text'] = value;
            }
            j++;
        });
    }

  let BASEHTML = cheerio.load((req.body.content) );

  BASEHTML("img").each( async function () {
    var old_src = BASEHTML(this).attr("src");
    ImageSrcArray.push(old_src);
  });
  async function f() {
    let promiseSee = await Promise.all(ImageSrcArray.map(async img => {
      let decodedImage = await BASE_64_CONVERTER(img);
      BASEHTML = cheerio.load( BASEHTML.html().toString().replace(img, decodedImage) );
      return decodedImage;
    })
    );
  }

  f().then((result1)=> {
  var EXTRACT_INFO = new Promise((resolve, reject) => {

    // paragraph_question question_box question_basic

    BASEHTML('.question_box').find("div > .question_paragraph ").each(function (index, question_box_element) {
      PARAGRAPH_TEXT = BASEHTML(question_box_element).html();

    /* Extracting Each Questions One by One */
    BASEHTML(this).parent().find("div > .question_text ").each(function (index, element) {
        QUESTION = BASEHTML(element).html();

        /* Extracting Options associated with each question */
        var correctOptionCounter = 0;
        var is_multicorrect = 0;
        BASEHTML(this).parent().find('div > table > tbody > tr >  .option_text').each(function (i, elemt) {
          OptionNumber++;
          let ch = BASEHTML(this).parent().find('.q_tbl_optn_col_1 > i').each(function (i3, e3) {
            console.log('Correct Opt : ', OptionNumber, BASEHTML(e3).attr('data-original-title').trim());
            // This is correct option detected
          });
          if (ch == '') {
            OPTIONS.push({ option_text: BASEHTML(elemt).text().trim(), is_correct: false, });
          } else {
            OPTIONS.push({ option_text: BASEHTML(elemt).text().trim(), is_correct: true, });
            correctOptionCounter++;
          }
        });
        /* / Extracting Options associated with each question */

        /* Checking for multicorrect option */
        if(correctOptionCounter > 1) {
          is_multicorrect = 1;
        }
        /* / Checking for multicorrect option */


        /* Extracting explanation from each question */
        if (BASEHTML(this).parent().find('.explanation_text').children().first().text().trim().length > 0) {
          // if multiple tags are used there
          EXPLANATION = BASEHTML(this).parent().find('.explanation_text').children().first().html().trim();
        } else {
          // if it has only explanation
          EXPLANATION = BASEHTML(this).parent().find('.explanation_text').html().trim();
        }
        /* / Extracting explanation from each question */



        var temp_sub_document = {
          question_text:  QUESTION.toString().split('"').join("'").replace(/\n/g, " ") ,
          options: OPTIONS,
          tags: tagsObject,
          status: 'draft',
          paragraph_text: PARAGRAPH_TEXT.toString().split('"').join("'").replace(/\n/g, " ") ,
          multicorrect: is_multicorrect,
          explanation: EXPLANATION.toString().split('"').join("'").replace(/\n/g, " ") ,
        };


        CombinedArray.push(temp_sub_document);

        QUESTION = "";
        options = [];
        explanation = "";
        EXPLANATION = "";
        OPTIONS = [];
      });

    });

    /* / Extracting Each Questions One by One */
    return resolve();
  });

}).then((result2)=> {

  res.render('display_json', { data: JSON.stringify(CombinedArray) });

});


});


 function BASE_64_CONVERTER (old_src) {
  return new Promise(function (resolve, reject) {
    request.get(old_src, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
       return resolve(data);
      } else {
        console.log('Rejected Image')
        return reject(old_src);
      }
    });
  });
};

module.exports = router;