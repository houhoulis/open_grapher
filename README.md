# This is a client-side, in-browser grapher of data sequence(s) submitted in the query string.

These query strings are available:

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

Soon, this will support multiple languages -- at least Catalan and English.

<p>Here's an example: Proveu ("try") <a href="open-grapher.html?títol=Simple%20graph&subtítol=My%20New%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight">open-grapher.html?títol=Simple%20graph&subtítol=My%20New%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight</a>.<br />
  Or add the "aproximada" term to draw the best-fit lines along with the data. <a href="open-grapher.html?títol=Graph%20with%20best%20fit%20lines&subtítol=My%20Fancier%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight&aproximada=hello">open-grapher.html?títol=Graph%20with%20best%20fit%20lines&subtítol=My%20Fancier%20Graph&some%20data=2,4,3,2&different%20data=4,4.8,6,3,5&inici=1&x=day&y=weight&aproximada=hello</a>.
</p>

-----------

### (Feel free to ignore this section if you know about this statistical topic. Clearly I know very little.)

When I started looking into "best fit" approximations, I did not realize that calculating a "best fit" line is not a simple problem! Not even close.

Even putting aside multi-variable analysis and other more complicated models, of which there are many, and just drawing a "best-fit" straight line, based only on the y-axis data. There are many models (with complicated math) based on what assumptions you can make about the data, and how you want to evaluate (minimize) the difference between any data point and the best-fit line.

https://en.wikipedia.org/wiki/Simple_linear_regression
https://en.wikipedia.org/wiki/Theil-Sen_estimator

Might include next, because they are easy to understand (both for visitors & for myself): https://en.wikipedia.org/wiki/Moving_average

Did not use, but another interesting method:

https://en.wikipedia.org/wiki/Exponential_smoothing

I didn't use it because it assumes the initial points are the most correct ("assign exponentially decreasing weights over time"). That was not a correct assumption for my use cases.

------------

### Running tests:

Run tests via

`npx ava`, or e.g. `npx ava -v test/test-theil-sen.js`
