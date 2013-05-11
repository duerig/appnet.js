# appnet.js

A library for interacting with app.net written in JavaScript. Exported
as a jQuery module.

# Example

<pre>
function success(response)
{
  console.log('success');
  console.dir(response);
}

function failure(meta)
{
  console.log('failure');
  console.dir(meta);
}

$.appnet().post.global({}, success, failure);
</pre>

## Warning: Completely untested and undocumented. More to come.