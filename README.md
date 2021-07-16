# This is a client-side, in-browser grapher of data sequence(s) submitted in the query string.

This project will draw a graph of any numeric sequences you like, entirely in the browser, using the Highcharts library. Besides the fundamental goal of drawing graphs of data locally (without hitting a server) by parsing query strings, there are three other features:

1. By passing in an extra query string, best-fit lines will be drawn for each of your sequences.
1. One click to change all the text from Catalan to English or vice versa.
1. Unit tests, using the ava library.


These are the special query strings that are available:

<ul>
  <li>'títol' or 'title'</li>
  <li>'subtítol' or 'subtitle'</li>
  <li>'x'</li>
  <li>'y'</li>
  <li>'inici' or 'start'</li>
  <li>'llengua' or 'language'</li>
  <li>'aproximada' or 'approximate'</li>
</ul>

If 'aproximada' or 'approximate' is set to anything in the query string, then each series of data will be graphed accompanied by best-fit lines calculated via <a href="https://en.wikipedia.org/wiki/Theil%E2%80%93Sen_estimator">Theil-Sen</a> and <a href="https://en.wikipedia.org/wiki/Linear_least_squares">Linear Least Squares</a>.

This supports Catalan (partially) and English.

<p>Here's an example: Proveu ("try") <a href="open-grapher.html?títol=Simple%20graph&subtítol=My%20New%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight">open-grapher.html?títol=Simple%20graph&subtítol=My%20New%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight</a>.<br />
  Or add the "aproximada" term to draw the best-fit lines along with the data. <a href="open-grapher.html?títol=Graph%20with%20best%20fit%20lines&subtítol=My%20Fancier%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight&aproximada=hello">open-grapher.html?títol=Graph%20with%20best%20fit%20lines&subtítol=My%20Fancier%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight&aproximada=hello</a>.
</p>

-----------

### (Feel free to ignore this section if you know about this statistical topic. Clearly I know very little.)

When I started looking into "best fit" approximations, I did not realize that calculating a "best fit" line is not a simple problem! Not even close.

Putting aside multi-variable analysis and other more complicated models, of which there are many, there are different ways to think about "best-fit" straight lines, based only on the y-axis data. There are many models (with less- or more-complicated math) based on what assumptions you can make about the data. There are also different ways to evaluate (minimize) the difference between the set of data points and the best-fit line.

https://en.wikipedia.org/wiki/Simple_linear_regression

------------

### Running tests:

Run tests via

`npx ava`, or for a single test, `npx ava -v test/test-theil-sen.js`

------------


### TODO:

1. Finish the Catalan text.
1. Have language selection persist on subsequent page loads.
1. Add this best fit algorithm: https://en.wikipedia.org/wiki/Moving_average
1. Perhaps add this as well: https://en.wikipedia.org/wiki/Exponential_smoothing  
However, I didn't use it because it assumes the initial points are the most correct ("assign exponentially decreasing weights over time"). That was not a correct assumption for my typical use cases.
