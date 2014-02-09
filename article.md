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

Write about the theoretical foundation for FRP. This will most likely be the
biggest or second biggest part of the article

### Reactive Programming

Write about reactive programming. Keep it short and sweet, too much to cover in
depth I think.

### Functional Programming

Write about functional programming. Also a short and sweet section, will most
likely have been covered earlier or later in the magazine.

### Functional Reactive Programming

Write about how the two paradigms come together to form FRP. What the synergy of
FP and RP means on a theoretical level.

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
