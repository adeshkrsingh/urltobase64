var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");
var base64Img = require("base64-img");
const IMAGE_DOWNLOADER = require('image-downloader')
var request = require('request').defaults({ encoding: null });

/* GET home page. */

// router.get("/tp-simple-question", function (req, res, next) {
//   res.render("fetch/tp_simple_question", { title: "Express" });
// });


router.get("/", function (req, res, next) {

    var QUESTION = "";
    var PARAGRAPH_TEXT = "";
    var OPTIONS = [];
    var OptionNumber = 0;
    var EXPLANATION = "";
    var CombinedArray = [];
    var ImageSrcArray = [];

    // var t = (req.body.tagsInput);
    // var tags = t.toString().split(',');
    // var tagsObject = [];

    // console.log(req.body['tags'])

    // var j = 0;
    //   if (tags !== undefined) {
    //       tags.forEach(function (value) {
    //           tagsObject[j] = {};
    //           if (value === undefined) {
    //               // to be handled by default value
    //           }
    //           else {
    //               tagsObject[j]['tag_text'] = value;
    //           }
    //           j++;
    //       });
    //   }

      var myhtml=`<table width="100%">
      <tbody>
          <tr>
              <td width="4%" align="right" valign="top"></td>
              <td width="100%" align="left" valign="center"> Study the diagram and mark the correct
                  option :-<br>
                  <blockquote><img src="https://s3-ap-southeast-1.amazonaws.com/test-content-images/data/images/common/papers/partners/32/3914/image001.png"
                          style="vertical-align: middle" alt="Image not present"><br></blockquote>
                  <table class="rte_tbl" align="" border="1" cellpadding="0" cellspacing="0" height="70"
                      width="567">
                      <tbody>
                          <tr>
                              <td align="center" width="5%%">(I)<br></td>
                              <td align="center" width="20%%">F<br></td>
                              <td align="center" width="5%%">:<br></td>
                              <td width="70%%">&nbsp;Cells in this stage remain metabolically active but
                                  no longer proliferate<br></td>
                          </tr>
                          <tr>
                              <td align="center" width="5%%">(II)<br></td>
                              <td align="center" width="20%%">A<br></td>
                              <td align="center" width="5%%">:<br></td>
                              <td width="70%%">&nbsp;DNA replicates in nucleus and centriole duplicates
                                  in the cytoplasm<br></td>
                          </tr>
                          <tr>
                              <td align="center" width="5%%">(III)<br></td>
                              <td align="center" width="20%%">D &amp; E<br></td>
                              <td align="center" width="5%%">:<br></td>
                              <td width="70%%">&nbsp;Constitutes more than 95% duration of cell cycle<br></td>
                          </tr>
                          <tr>
                              <td align="center" width="5%%">(IV)<br></td>
                              <td align="center" width="20%%">C<br></td>
                              <td align="center" width="5%%">:<br></td>
                              <td width="70%%">&nbsp;Interval between mitosis and initiation of DNA
                                  replication<br></td>
                          </tr>
                      </tbody>
                  </table><br>
              </td>
          </tr>
      </tbody>
  </table>
  <div id="optionsViewDiv">
      <table width="100%">
          <tbody>
              <tr>
                  <td width="8%" align="right" valign="top">(1) </td>
                  <td width="16%" align="left" valign="top">(I)</td>
                  <td width="8%" align="right" valign="top">(2) </td>
                  <td width="16%" align="left" valign="top">(II)</td>
                  <td width="8%" align="right" valign="top">(3) </td>
                  <td width="16%" align="left" valign="top">(III)</td>
                  <td width="8%" align="right" valign="top">(4) </td>
                  <td width="16%" align="left" valign="top">(IV)</td>
                  <td width="4%"> </td>
              </tr>
          </tbody>
      </table>
  </div>
  <div><u>Correct Answer</u>:&nbsp;1<br><u>Your Answer:</u>2<br><u>Status:</u> incorrect<br><br><br></div>`;

    let BASEHTML = cheerio.load(myhtml );
    // let BASEHTML = cheerio.load((req.body.content) );

    // console.log(BASEHTML.html());

    BASEHTML("img").each( async function () {
        console.log("working >>>")
      var old_src = BASEHTML(this).attr("src");
      ImageSrcArray.push(old_src);
    });
    async function f() {
      let promiseSee = await Promise.all(ImageSrcArray.map(async img => {
        let decodedImage = await BASE_64_CONVERTER(img);
        // console.log("img---", img);
        // console.log("decodedImage---", decodedImage);
        BASEHTML = cheerio.load( BASEHTML.html().toString().replace(img, decodedImage) );
        // console.log(BASEHTML.html())
        return 'decodedImage';
      })
      );
    }

    f().then((result1)=> {
    var EXTRACT_INFO = new Promise((resolve, reject) => {

      /* Extracting Each Questions One by One */
      BASEHTML('table').find("tbody").each(function (index, element) {
        QUESTION = BASEHTML(element).html();

        console.log("************", QUESTION, "*****************")

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