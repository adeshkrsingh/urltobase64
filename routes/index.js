var express = require("express");
var router = express.Router();
const cheerio = require("cheerio");

var myHtml = `<div class="question_basic position-relative 
      
not_attempted
individual_question" id="question_basic" data-topic-name="" data-topic-id="">

<strong> Question
    <span class="question_number margin-r-5">2 of 20</span>


    <span class="text-orange">
        <i class="fa fa-info-circle"></i> You did not attempt this Question. </span>


</strong>
<div class="question_text ">
    Either the committee on course design or the committee on college operation __________these matter.
</div>
<table class=" question_option_table table no-border thin_row">

    <tbody>
        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">



            </td>
            <td class="q_tbl_optn_col_2">
                <strong>A.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a57102527e427c11f3c90"> decide</td>
        </tr>

        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">



            </td>
            <td class="q_tbl_optn_col_2">
                <strong>B.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a57102527e427c11f3c91">
                <p>decide on&nbsp;&nbsp;&nbsp;&nbsp;</p>
            </td>
        </tr>

        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">



            </td>
            <td class="q_tbl_optn_col_2">
                <strong>C.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a57102527e427c11f3c92"> decide in</td>
        </tr>

        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">


                <i class="fa fa-check-circle text-green" title="" data-original-title="This is the correct option"></i>


            </td>
            <td class="q_tbl_optn_col_2">
                <strong>D.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a57102527e427c11f3c93"> decides</td>
        </tr>

    </tbody>
</table>

<strong> Explanation : </strong>
<div class="explanation_text margin-b-10">
    Committee is a singular entity , hence the singular form "decides" is the correct answer.
</div>

<div class="bg-gray padding-5">
    <div class="text-center">
        <strong> Question Analytics </strong>
    </div>
    <ul class="clearfix two_row_ul">
        <li>
            <div class="padding-t-10  border-bottom">
                <span class="font-14 text-primary padding-5">12359 users</span>
                <!-- <span class="font-12 text-gray-dark">/ </span> -->
            </div>
            <div class="text-gray-dark padding-t-5">Attempted</div>
        </li>
        <li>
            <div class="padding-t-10  border-bottom">
                <span class="font-14 text-green padding-5">6152 users</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-check-circle text-green"></i>
                Solved Correctly
            </div>
        </li>
        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-red padding-5">6207 users</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-times-circle text-red"></i>
                Solved Incorrectly</div>
        </li>
        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-16 text-primary padding-5"> 49.78 %</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-dot-circle-o text-primary"></i>
                Accuracy
            </div>
        </li>
        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-primary padding-5">0.0 secs </span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-clock-o text-primary"></i>
                Your Time
            </div>
        </li>

        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-gray-dark padding-5">42.8 secs</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-clock-o text-gray-dark"></i>
                Avg. Solving Time
            </div>
        </li>


        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-yellow padding-5">0.0 secs </span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-hourglass-half text-yellow"></i>
                Fastest Solving Time
            </div>
        </li>
    </ul>

</div>
</div>



<div class="question_basic position-relative 
      
not_attempted
individual_question" id="question_basic" data-topic-name="" data-topic-id="">

<strong> Question
    <span class="question_number margin-r-5">1 of 20</span>


    <span class="text-orange">
        <i class="fa fa-info-circle"></i> You did not attempt this Question. </span>


</strong>
<div class="question_text ">
    <p>I __________ &nbsp;just one proper meal since yesterday morning
        <br>
    </p>
</div>
<table class=" question_option_table table no-border thin_row">

    <tbody>
        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">



            </td>
            <td class="q_tbl_optn_col_2">
                <strong>A.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a55c92527e427c11f3c89">
                <p>had</p>
            </td>
        </tr>

        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">



            </td>
            <td class="q_tbl_optn_col_2">
                <strong>B.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a55c92527e427c11f3c8a">
                <p>ate</p>
            </td>
        </tr>

        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">


                <i class="fa fa-check-circle text-green" title="" data-original-title="This is the correct option"></i>


            </td>
            <td class="q_tbl_optn_col_2">
                <strong>C.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a55c92527e427c11f3c8b">
                <p>have had</p>
            </td>
        </tr>

        <tr>
            <td class="q_tbl_optn_col_1">

            </td>
            <td class="q_tbl_optn_col_1">



            </td>
            <td class="q_tbl_optn_col_2">
                <strong>D.</strong>
            </td>
            <td class="q_tbl_optn_col_3 option_text" data-option-id="569a55c92527e427c11f3c8c">
                <p>have eaten</p>
            </td>
        </tr>

    </tbody>
</table>

<strong> Explanation : </strong>
<div class="explanation_text margin-b-10">
    <p>
        <span style="">I have had just one proper meal since yesterday morning.</span>
    </p>
    <p>
        <span style="">For Explanation Read:
            <br>
        </span>http://www.bbc.co.uk/worldservice/learningenglish/grammar/learnit/learnitv343.shtml
        <br>
    </p>
</div>

<div class="bg-gray padding-5">
    <div class="text-center">
        <strong> Question Analytics </strong>
    </div>
    <ul class="clearfix two_row_ul">
        <li>
            <div class="padding-t-10  border-bottom">
                <span class="font-14 text-primary padding-5">12531 users</span>
                <!-- <span class="font-12 text-gray-dark">/ </span> -->
            </div>
            <div class="text-gray-dark padding-t-5">Attempted</div>
        </li>
        <li>
            <div class="padding-t-10  border-bottom">
                <span class="font-14 text-green padding-5">4280 users</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-check-circle text-green"></i>
                Solved Correctly
            </div>
        </li>
        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-red padding-5">8251 users</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-times-circle text-red"></i>
                Solved Incorrectly</div>
        </li>
        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-16 text-primary padding-5"> 34.16 %</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-dot-circle-o text-primary"></i>
                Accuracy
            </div>
        </li>
        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-primary padding-5">0.0 secs </span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-clock-o text-primary"></i>
                Your Time
            </div>
        </li>

        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-gray-dark padding-5">35.51 secs</span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-clock-o text-gray-dark"></i>
                Avg. Solving Time
            </div>
        </li>


        <li>
            <div class="padding-t-10 border-bottom">
                <span class="font-14 text-yellow padding-5">0.0 secs </span>
                <!-- <span class="font-12 text-gray-dark">/ 20</span> -->
            </div>
            <div class="text-gray-dark padding-t-5">
                <i class="fa fa-hourglass-half text-yellow"></i>
                Fastest Solving Time
            </div>
        </li>
    </ul>

</div>
</div>`;

const $ = cheerio.load(myHtml);

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
    console.log("RUNNING POST METHOD");
    const $ = cheerio.load( req.body.content );
    // console.log(req.body.content );
  var list = [], options = []; let correctOpt = 0; let OptionNumber = 0; let explanation = "";

  $('.question_basic')
    .find("div > .question_text ")
    .each(function(index, element) {
      list.push($(element).html());

      console.log( $(element).html().trim() );
      $(this).parent().find('div > table > tbody > tr >  .option_text').each(function(i, elemt) {
        OptionNumber++;

        console.log(OptionNumber, $(elemt).text().trim() );
        let ch =  $(this).parent().find('.q_tbl_optn_col_1 > i').each(function(i3, e3) {
            console.log( 'Correct Opt : ',OptionNumber,  $(e3).attr('data-original-title').trim() );
        });

        if(ch == '') {
            console.log('*****');
            options.push({
                opt: $(elemt).text().trim(),
                is_correct: 0,
            });
        } else {
            console.log('######');
            options.push({
                opt: $(elemt).text().trim(),
                is_correct: 1,
            });
        }
    });

    if( $(this).parent().find('.explanation_text').children().first().text().trim().length > 0 ) {
        explanation = $(this).parent().find('.explanation_text').children().first().html().trim();
        console.log( explanation );
    } else {
        explanation = $(this).parent().find('.explanation_text').html().trim();
        console.log( explanation );
    }

    // console.log( $(this).parent().find('.explanation_text').children().first().text() );
    OptionNumber = 0;
    });
  res.render("add_question", { title: "Express",
                                question: list[0],
                                options: options,
                                explanation: explanation,
                                 });
});

module.exports = router;
