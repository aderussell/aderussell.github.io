---
layout: post
title:  "Sequences 1: Sequences & iterators"
date:   2024-08-25
tags: swift, sequence, iterator,
description: "How Sequences & Iterators work in Swift"
imagepath: "/images/blog/sequences/"
---

Although not often directly thought about, sequences are one of the most fundamental components of the Swift language.

If you've used a for-in loop, which you probably have, then you have used a sequence. 
Prior to swift 3, swift included a classic c-style for loop but now only the sequence consuming for-in loop remains.

```swift
for element in aSequence {
    // do something with element
}
```


```swift
for element in ["a", "b", "c"] {
    // do something with element from Array
}

for i in 0..<10 {
    // do something with i from Range
}

for (key, value) in ["a": 1, "b": 2, "c": 3] {
    // do something with key & value from Dictionary
}
```


A Sequence in Swift is a protocol that represents a series of values, which can be iterated over one by one. The `Sequence` protocol is central to many Swift collection types, including ranges, arrays, dictionaries, and sets. It provides a unified way to work with different kinds of collections.

```swift
protocol Sequence<Element> {
    associatedtype Element where Self.Element == Self.Iterator.Element
    associatedtype Iterator : IteratorProtocol

    func makeIterator() -> Self.Iterator
} 
```


```swift
protocol IteratorProtocol<Element> {
    associatedtype Element

    mutating func next() -> Self.Element?
}
```


## A Simple Implementation
The following simple implementation of a sequence, and its iterator, which will return all the characters of the latin alphabet.

```swift
public struct AlphabetIterator: IteratorProtocol {
    public typealias Element = Character
    private var position = 0
    
    public init() {}
    
    public mutating func next() -> Element? {
        guard position < 26 else { return nil }
        defer { position += 1 }
        return Character(UnicodeScalar(position + 97)!)
    }
}

public struct AlphabetSequence: Sequence {
    public init() {}
    public func makeIterator() -> AlphabetIterator {
        AlphabetIterator()
    }
}
```


## Why is iterator separate from sequence
You may wonder why a sequence has a separate iterator type that it has to create. Well, there are two reasons. 
Firstly, a Collection (a subtype of Sequence) can be iterated over multiple times. If the next method was part of the sequence itself, there would need to be a way to manually return the offset to the start to allow it to be iterated over again. That would add complexity to using it and introduce a potential class of bugs from passing a sequence to an element which has already been iterated over. 
The second and greater reason is that most sequences, including all the standard library collection types, are structs. Using the next method modifies the offset within the sequence and that would require all collections to always be mutable to iterate, something the creators of Swift very much discourage. 
By having a separate iterator type, which a sequence can provide, both of these issues can be avoided.


## The extension methods
The real power of Sequence is in its included extension methods.  

![All the sequence extension methods](/images/blog/sequences/Sequence-extension-methods.png)
These extension methods provide a large number of handy operations which can be performed on the sequence, such as sorting, shuffling, splitting, joining.

Also provided are the 'higher order' functions, map, filter, reduce (and their offshoots compactMap & filterMap).

There are even more useful extension methods for Sequences (and Collections) in the [Swift Algorithms Package](https://github.com/apple/swift-algorithms).

And of course you can easily create your own. Let's look at a really simple example:

```swift
extension Sequence where Element: AdditiveArithmetic {
    func sum() -> Element {
        self.reduce(.zero, +)
    }
}
```

We have extended any Sequence which elements conforms to `AdditiveArithmetic` (so all numbers) with a method which will consume the sequence and reduce it down by adding all of the elements together. 

## A few potential shortcomings
There a few things to understand about sequences when compared to collections which we will see later:
* They do not guarantee multiple traversals. Potentially a sequence could only be consumed once and then would no longer be available. An example would be a Sequence which reads lines from a file; once you reach the end you would need to close the file and then open again with a new sequence to iterate through the lines. If you wanted to consume the sequence repeatedly you would need to insert all of the elements into a Collection, like Array.
	* A number of extension methods which need to modify the order of elements in a sequence (like `sorted()` or `reversed()`) will need to do this and so will return an Array containing all of the elements in their new order.
* You cannot randomly access elements in the middle of the sequence; you need to iterate though until you reach that point.



As you could probably guess, the next entry will be on Collections. See you there.