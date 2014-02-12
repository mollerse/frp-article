# Functional Reactive Programming

Short ingress with some highlights and summaries of what FRP is and what we will
cover in the article

## Background and History

Functional Reactive Programming is not a new concept in computer science. It can
be traced to 1997, when Conal Elliot, from the Microsoft Research Group,
and Paul Hudak, from Yale University released, the research paper
"Functional Reactive Animation" in the proceedings of International Conference
on Functional Programming [1].

The academic paper introduces a collection of data types and functions in a
system called FRAN (**F**unctional **R**eactive **AN**imations). FRAN in
turn is preceeded by work done by Conal Elliot and the ActiveVRML modeling
language. ActiveVRML was a declerative modeling language for defining simple, sophisticated and interactive animations [2].

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

Functional reactive programming is the combination of two other programming
paradigms; functional and reactive programming. And now we will see which
parts from the two paradigms FRP makes use of and how it makes FRP possible.

At its most basic level, FRP is about abstractions for representing a value as
it changes over time. Historically, this has been difficult to achieve using
traditional imperative programming. The imperative programming paradigm is
temporally discrete in nature, which has only allowed for indirect
representation of discretely evolving values.

### Reactive Programming

Reactive programming is a programming paradigm that deals primarily with the
flow of data and semantics for expressing how changes in state propagates
through a dependency graph. Using reactive programming, a programmer can
easily express data flows and set up dependencies and leave the propagation of
change to the execution model of the language or liberary used.

The best example of data flow is the interaction between cells in a
spreadsheet. If you change one cell, another cell which has a depencendy on
that cell would automatically be updated. For instance with one cell being the
sum of two other cells.

This concept of data flow bears a resemblence to the well known observer
pattern. Using the reactive semantics allows us to express the same as the
observer pattern, but easier and with more granularity. Where the observer
pattern deals with whole objects, reactive data flows would be applicable to
attributes of objects.

### Functional Programming

---
Topics to cover:
Combinators, sequences, immutability, side-effect free.

### Functional Reactive Programming
FRP has two different ways of representing a value that changes with time;
continous and discrete. A continous value, or behavior as it is commonly known
in FRP, is the representation of something that always has a value when
observed. For instance the current time or the height of a person. It does never
not have a value. Discrete values, on the other hand, only have a value at
certain times.

Combining the notion of dataflow from reactive programming and side-effect free
combinators from functional programming, we can define values that represent the
two concepts of values over time directly. This gives us temporal reasoning as a
first class citizen.

## FRP in practice

Maybe a section with a more practical look at FRP. Which problems does it solve
and why does it offer a worthwhile solution? This is probably the place to
mention animation, interfaces and asynchronous/evented programming.

Maybe also mention Reactive Extensions and similar libs here.

## FRP example

A short example using Bacon.js.

### Bacon.js introduction

Write a short introduction to Bacon.js and its API, mention EventStreams and
Properties. Also mention terminating functions (like onValue, assign, log etc)

### Bacon.js example

We will implement a simple SVG dot-drawer: tracking the mouse movement
and when the mouse is clicked draw dots every `N` milliseconds.

This kind of state management and input/output could easily become a
very cumbersome task using traditional imperative code, but using
FRP, this should be a breeze.

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
