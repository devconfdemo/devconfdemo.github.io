
document.addEventListener('alpine:init', async () => {
    setTimeout(function(){
        Draftsman.contains_teleports = false;
        Draftsman.disable_cache_for_page();
    },1);
});

function make_id(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

google.charts.load('current', {'packages':['corechart']});
function draw_line_graph(data){
    let scores = [0,0,0,0,0];
    data.forEach(x => {
        scores[x.score -1] += 1;
    });
    var prepared_data = google.visualization.arrayToDataTable([
      ['Score', 'Count'],
      ['1',  scores[0]],
      ['2',  scores[1]],
      ['3',  scores[2]],
      ['4',  scores[3]],
      ['5',  scores[4]]
    ]);

    var options = {
      title: 'Score',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('score_chart'));

    chart.draw(prepared_data, options);
}

// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 10, left: 10};
const width = 780 - margin.left - margin.right;
const height = 480 - margin.top - margin.bottom;
var svg = null;

document.addEventListener('DOMContentLoaded', function() {
   // append the svg object to the body of the page
   svg = d3.select("#word_cloud").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");
}, false);

function draw_word_cloud(data){
    let words = {};
    let myWords = [];
    data.forEach(x => {
        let word = x.oneWord;
        if (word in words){
            words[word] += 1;
        } else {
            words[word] = 1;
        }
    });

    let items = Object.keys(words).map(function(key) {
      return [key, words[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    let size = 110;
    let prev = 1000;
    items.forEach(x => {
        if (x[1] < prev && size != 20){
            size -= 10;
            prev = x[1];
        }
        myWords.push({word: x[0], size: size});
    })

    if (myWords.length == 1){
        myWords.push({word: '', size: 10});
    }

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    svg.selectAll("*").remove();
    var layout = d3.layout.cloud()
      .size([width, height])
      .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
      .padding(5)        //space between words
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .fontSize(function(d) { return d.size; })      // font size of words
      .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
      svg
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
          .selectAll("text")
            .data(words)
          .enter().append("text")
            .style("font-size", function(d) { return d.size; })
            .style("fill", "#69b3a2")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
}

function sleep(ms) {
    console.trace(`Sleep ${ms} milliseconds`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

var keys = [];
function prepare_comments(data,comments){
    data.forEach(x => {
        if (!x.screenName || !x.comment){
            console.log("!!!!!!!!")
            return;
        }
        let key = x.screenName + x.comment;
        if (!keys.includes(key)){
            comments.push(x);
            keys.push(key);
        }
    });
    return comments;
}