# Functional Reactive Programming

Short ingress with some highlights and summaries of what FRP is and what we will
cover in the article

## Background / History

Functional Reactive Programming is not a new concept in computer science, but stems
from 1997. Conal Elliot from the Microsoft Research Group and Paul Hudak from
Yale University released the research paper Functional Reactive Animation in the
proceedings of International Conference on Functional Programming [1].

The academic paper introduces a collection of data types and functions in a
system called FRAN (**F**unctional **R**eactive **AN**imations). FRAN in
turn is preceeded by work done by Conal Elliot and the ActiveVRML modeling
language. ActiveVRML was a declerative modeling language for defining simple, sophisticated and interactive animations [2].

The implementation of FRAN was based on the programming language Haskell, which
is an easy extendable functional programming language. As Haskell may have some
problems with space leaks, FRAN did aswell. To try to fix this, Paul Hudak
(et. al.) introduced Real Time FRP (RT-FRP) in a paper from 2001 [3]. RT-FRP
made some simplifications to the model, but in turn lost some of the
expressive-ness of the FRAN system. A short year after introducing RT-FRP,
the Yale team also released Event-Driven FRP, focusing on value changes
triggered by events and propagating values only on these events [4].


---

[Read more on Elm thesis](http://www.testblogpleaseignore.com/wp-content/uploads/2012/04/thesis.pdf)

Short background of FRP, maybe with some history. Mention the birth of FRP with
FRAN and academic beginnings.

## Theoretical foundation

Functional reactive programming is the combination of two other programming
paradigms, functional and reactive programming. At its most basic level, FRP is
about abstractions for representing a value as it changes over time. FRP has two
different ways of representing a value that changes with time; continous and
discrete.

A continous value, or behavior as it is commonly known in FRP, is the
representation of something that always has a value when observed. For instance
the current time or the height of a person. It does never not have a value.
Discrete values, on the other hand, only have a value at certain times.

Historically, this has been difficult to achieve using traditional imperative
programming. The imperative programming paradigm is temporally discrete in
nature, which has only allowed for indirect representation of discretely
evolving values.

Combining the notion of dataflow from reactive programming and side-effect free
combinators from functional programming, we can define values that represent the
two concepts of values over time directly. This gives us temporal reasoning as a
first class citizen.

---
Write about the theoretical foundation for FRP. This will most likely be the
biggest or second biggest part of the article

### Reactive Programming

Reactive programming is a programming paradigm that deals primarily with the
flow of data and semantics for expressing how changes in state propagates
through a dependency graph. Using reactive programming, a programmer can easily
express data flows and set up dependencies and leave the propagation of change
to the execution model of the language or liberary used.

The best example of data flow is the interaction between cells in a spreadsheet.
If you change one cell, another cell which has a depencendy on that cell would
automatically be updated. For instance with one cell being the sum of two other
cells.

This concept of data flow bears a resemblence to the well known observer
pattern. Using the reactive semantics allows us to express the same as the
observer pattern, but easier and with more granularity. Where the observer
pattern deals with whole objects, reactive data flows would be applicable to
attributes of objects.


---
Topics to cover:
Dataflow, propagation of state through dependency graphs. Maybe some graphics?

Keep implementation details out of it, stick to the theoretical stuff.

### Functional Programming

---
Topics to cover:
Combinators, sequences, immutability, side-effect free.

Do we mention monads here, or leave it out?

### Functional Reactive Programming

---
Some of the stuff in the introduction to this section could probably live here instead.


## FRP in practice

Maybe a section with a more practical look at FRP. Which problems does it solve
and why does it offer a worthwhile solution? This is probably the place to
mention animation, interfaces and asynchronous/evented programming.

Maybe also mention Reactive Extensions and similar libs here.

## FRP example

A short example using Bacon.js.

### Bacon.js introduction

Write a short introduction to Bacon.js and its API, mention EventStreams and
Properties.

### Bacon.js example

The example itself. Implement an interface or some collaborative thing

## Summary / Wrapup

Write a short summary here.



[1]: http://conal.net/papers/icfp97/
[2]: http://conal.net/papers/ActiveVRML/
[3]: http://dl.acm.org/citation.cfm?id=507654
[4]: http://link.springer.com/chapter/10.1007/3-540-45587-6_11
