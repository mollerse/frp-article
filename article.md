# Functional Reactive Programming

In this article we explore the history of functional reactive programming, and
see that it is not necessarily as new at it can seem. Functional reactive
programming is a merge of two different programming paradigms; functional
and reactive. We will see what each of those is and how to use them in
combination.

After reading this article, you will have a working knowledge of what
functional reactive programming is, and how to use it in javascrupt using
a library called Bacon.js. We will see a practical example and some real
life code.

## Background and History

Functional Reactive Programming is not a new concept in computer science. It can
be traced to 1997, when Conal Elliot, from the Microsoft Research Group,
and Paul Hudak, from Yale University released, the research paper
"Functional Reactive Animation" in the proceedings of International Conference
on Functional Programming [1].

The academic paper introduces a collection of data types and functions in a
system called FRAN (**F**unctional **R**eactive **AN**imations). FRAN in turn
is preceeded by work done by Conal Elliot and the ActiveVRML modeling
language. ActiveVRML was a declerative modeling language for defining simple,
sophisticated and interactive animations [2].

The implementation of FRAN was based on the programming language Haskell, which
is an easy extendable functional programming language. As Haskell may have some
problems with space leaks, FRAN did aswell. To try to fix this, Paul Hudak
(et. al.) introduced Real Time FRP (RT-FRP) in a paper from 2001 [3]. RT-FRP
made some simplifications to the model, but in turn lost some of the
expressiveness of the FRAN system. A short year after introducing RT-FRP,
the Yale team also released Event-Driven FRP, focusing on value changes
triggered by events and propagating values only on these events [4].

Some years later, Conal Elliot published the paper "Push-Pull Functional
Reactive Programming" (2009) [5]. In this paper he described a way to implement
FRP with a more modernized interface, and where the reactive values had a more
simplified semantic. All reactive values were described with push- and pull-based
evaluation.

In later years, several different implementations and libraries have arisen.
Some examples are the compile-to-javascript languages
[Elm](http://elm-lang.org) and [Flapjax](http://www.flapjax-lang.org/),
or [Bacon.js](https://github.com/baconjs/bacon.js) – which is written
completely in Javascript. There are also implementations in languages like
C#, Java, Scala, Objective-C, Ruby, and more.

## Theoretical foundation

The primary goal of functional reactive programming is to enable functional
programming of user interfaces. Why does one want to program functionally?
Functional programming gives the programmer tools to reason about code, both
infromal and rigorous, through the use of immutability and pure functions.

Immutability means that once a value has been instansiated, it does not
change. Pure functions means that a function will always produce the same
output given the same input.

To create more advanced behavior one can combine functions through other
functions, which are known as higher order functions. These take functions as
inputs and produce functions as output. This class of functions are also known
as combinators. The most well-known combinators are map, reduce and filter.
When composing functions in this manner, we program declaratively. A
declarative programming style is more concerned with the _what_ happens
instead of the _how_ something happens.

If these traits are so great, why are they not found more often in modern
programming? It has to do with the fact that many of the important attributes
of programs are naturally mutable. This is especially true for user
interfaces, where the user may mutate the state of the interface through
actions.

In addition to being mutable environments like user interfaces are often
asynchronous in their behavior. This leaves us with an environment where the
state may change at any point in time and outside the control of the program.
In addition the order in which actions are performed is also important, so the
temporal aspect of actions needs to be accounted for. This does seem largely
at odds with the traits we want to obtain from functional programming. This is
where reactive programming comes in.

Reactive programming is a programming paradigm that deals primarily with the
flow of data and semantics for expressing how changes in state propagates
through a dependency graph. Using reactive programming, a programmer is able
to define datatypes that express data flows while leaving the task of actually
progagating state to the execution model of the language or liberary used.

The best example of data flow is the interaction between cells in a
spreadsheet. If you change one cell, another cell which has a depencendy on
that cell would automatically be updated. For instance with one cell being the
sum of two other cells.

Combining the reactive datatypes with functional composition we arrive at
functional reactive programming. Because the semantics of reactive programming
allows us to define datatypes that represent a value that handles its own
mutation we can use that to introduce "safe" abstractions. Functions opreate
only on theese abstracted datatypes and from the view of the function the
state is immutable. All the mutation is left to the underlying implementation
of the datatype. We can now use the composition vocabulary from functional
programming without compromising the traits we wanted in the first place.

Classical functional reactive programming deals with two different
representations for values that vary with time. Behaviors, which are continous
values, can be represented as a function of time `t` which yields a value `v`.
Events, which are sequences of discrete events modelled as a list of value and
time pairs `[(t, v)]`, to account for discrete phenomena. This way FRP
succesfully deals with mutable and asynchronous environments while accounting
for the temporal aspect.

## FRP In Practice

As mentioned a few times already, FRP really shines when used to program user
interfaces. But there is nothing that limits us from applying the same
theories to other environments that share the same characteristics as user
interfaces.

The characteristics that describe environments where FRP is well suited is
time varying values which are the result of asynchronous events. A webserver
getting a request from a client is one example.

## Practical Example

Many implementations across multiple languages exists today. We will take a
closer look at Bacon.js which is a classical FRP implementation in Javascript.
Bacon.js is created by Finish developer Juha Paananen from Reaktor. In this
section we will see how Bacon.js can be used to achieve FRP in the browser.z

We will use Bacon.js to implement a simple SVG dot-drawer:
tracking the mouse movement and when the mouse button is pressed draw
dots every `N` milliseconds.

### Bacon.js Introduction

As with theoretical FRP, we have events and behaviours in Bacon.js, but
instead of calling it a behaviour we call it a Property. A property always
has a value, but an event stream is discrete.

In Bacon.js we can wrap event sources to reactive data types using different
functions. E.g. `Bacon.fromEventTarget()` wraps events from DOM or jQuery events,
objects from Node.JS' EventEmitter, or `Bacon.fromPromise()` creates
reactive data from promises. There are also several other methods, like creating
data types from callbacks, from arrays, constant intervals and polling.

In the most simplest form we can react to an event like so:

```javascript
Bacon.fromEventTarget($("button"), "click")
  .onValue(function() { console.log("FRP!"); })
```

We see that we can print string when a button is clicked. In most cases,
Bacon.JS returns a new event stream or property, but `.onValue` returns
a function to unsubscribe to the events. Bacon.js uses lazy evaluation
internally, only pushing values if there is subscribers. For example,
without adding `.onValue` (or other methods adding subscribers,
like `assign`) no value will get pushed.

```javascript
Bacon.fromEventTarget($("button"), "click")
  .doAction(function() { console.log("FRP!"); })
```

Prints nothing, even if the button is clicked.

But Bacon.js can do much, much more than just printing values on clicks.
We can start getting creative by using regular functional operations like
`map`, `filter`, `reduce` and more. We will see more of this in the next
section, where we implement our example.

### Bacon.js Example Implementation

The kind of state management and input/output handling this example demands
could easily become a very cumbersome task using traditional imperative
code. Using FRP, how ever, this should be a breeze.

We begin by initiating some event streams we shall use to compose
a property of mouse movements.

```javascript
var $svg = $('svg'),
    mouseMove = bacon.fromEventTarget($svg, 'mousemove'),
    mouseDown = bacon.fromEventTarget($svg, 'mousedown').map(true),
    mouseUp = bacon.fromEventTarget($svg, 'mouseup').map(false);
```

In this code we start of by fetching our SVG element. With that element,
we create three different event streams: `mouseMove` - a property
(behaviour in traditional FRP lingo), that holds information about
the position of the mouse. `mouseDown` - a discrete reactive
data type that is triggered each time a mouse is clicked. Note the
transformation on the end. By default, using `.fromEventTarget`
gives the jQuery event as value, but by doing `.map(true)` we know we
have a event stream with the value `true` each time the event stream is
triggered. The `mouseUp` value is similar to `mouseDown`,
except we transform the data value to be false for each trigger.

Using both the `mouseDown` and `mouseUp` we can compose a new behaviour
indicating whether or not the mouse button is held down.

```javascript
var isClickDown = mouseDown.merge(mouseUp).toProperty(false);
```

We see, if we have a stream of `false` values and merge it with a
stream of `true` values, the resulting stream will be a stream of
both `false` and `true`. We use `.toProperty(false)` to generate
a property with `false` as the initial default value. The result,
as stored in `isClickDown`, is a property that has the value `true`
if the mouse is clicked, and `false` otherwise. It's important to
notice, `mouseDown` and `mouseUp` is not altered in any way, and
the returned `isClickDown` is an new immutable property.

We can use these reactive data types to compose the information we
need. We will now define `mouseNewXY`; a property with values of
the mouses x and y position when the mouse is clicked.

```javascript
var mouseNewXY =
  mouseMove
    .filter(isClickDown)
    .throttle(50)
    .map(function (e) {
      return {
        x: e.clientX,
        y: e.clientY,
        color: randomColor
      };
    });
```

We see we take base in `mouseMove` which we have defined earlier.
Taking that event stream, we use filter and the property `isClickedDown`
to generate a property that has value only when the property `isClickDown`
is `true` – that is, only when the mouse button is pressed.

With that generated property, we throttle it per 50 milliseconds. The
result is converted to an discrete event stream that has a value only
every 50 milliseconds.

Remember, per default `.fromEventTarget` gives the jQuery event-object
as value, so we need to transform the value to a more readable format.
In this example randomColor is just a random generated hex color.

We now have a event stream of a object with the mouse position and a color,
only when the mouse button is pressed, and throttled over 50 ms. We can
use this event stream to draw out circles.

```javascript
mouseNewXY
  .map(toCircle)
  .assign($svg[0], 'appendChild');
```

In this code we have `toCircle`, a simple helper function used to
convert from the data object to a SVG circle DOM element. We use
Bacon's `assign` to terminate the reactive data type. Each circle element
we get we append it to the SVG DOM element. Now we have a working
example, in just 20 lines of code (plus helpers).

By using this example, we see some pretty interesting aspects.
We see how easily we can compose reactive data types and manipulate
them using functional programming. We have no unwanted side-effects
or manual handling of states.

The very cool thing is, we can easily extend this example and add
multiple input sources or even outputs. As all reactive data types
are immutable, we can use them again in different ways. For example,
if we want to show if the mouse is pressed we can use the following
code:

```javascript
isClickDown
  .map(function (down) {
    return down ? 'Yes' : 'No';
  })
  .assign($('.mouse-down'), 'text')
```

We can use `isClickDown` again, without having to think about it's
previous involvements. Similarly, if we want to make this distributed
through web sockets by adding a new input source. Replacing the code
from before:

```javascript
mouseNewXY
  .merge(bacon.fromEventTarget(socket, 'data'))
  .map(toCircle)
  .assign($svg[0], 'appendChild');
```

In this example we say that the socket is a socket instance of
socket.io, and that it emits our mouse data on the channgel `data`.

In addition we would have to emit data using our `mouseNewXY` data type.

## Summary / Wrapup

Write a short summary here.



[1]: http://conal.net/papers/icfp97/
[2]: http://conal.net/papers/ActiveVRML/
[3]: http://dl.acm.org/citation.cfm?id=507654
[4]: http://link.springer.com/chapter/10.1007/3-540-45587-6_11
[5]: http://conal.net/papers/push-pull-frp/push-pull-frp.pdf
