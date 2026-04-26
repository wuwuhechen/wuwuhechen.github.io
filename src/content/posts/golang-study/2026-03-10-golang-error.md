---
title: Golang错误处理的介绍和使用
published: 2026-03-10
date: 2026-03-10
pinned: false
description: 介绍Golang错误处理的基本概念和常用的错误处理方式，帮助初学者理解和使用Golang的错误处理机制。
tags: [Golang, 基础知识]
category: Golang
licenseName: Unlicensed
draft: false
permalink: golang-error
---

符合Go语言习惯的做法是使用一个独立、明确的返回值来传递错误信息，这与Java等语言中使用的异常和C语言中用到的重载有着明显的不同，Go语言的处理方式能清楚的知道哪个函数返回了错误。

在Go语言中，错误处理通常使用内置的`error`接口来表示错误。函数可以返回一个`error`类型的值来指示是否发生了错误，如果没有错误发生，则返回`nil`。调用者可以检查返回的错误值来决定如何处理错误。

你还可以通过实现`error`接口来创建自定义错误类型，以提供更丰富的错误信息和上下文。这使得错误处理更加灵活和强大，能够满足不同场景下的需求。

下面是一个简单的示例，展示了如何使用Go语言的错误处理机制：

```go
package main

import (
	"errors"
	"fmt"
)

// 定义一个函数，接受一个整数参数，并返回一个整数结果和一个错误，使用了内置的error接口来表示错误，可扩展性较弱，难以根据输入参数提供更多的错误信息
func f1(arg int) (int, error) {
	if arg == 42 {
		return -1, errors.New("can't work with 42")
	}

	return arg + 3, nil
}

// 定义一个自定义错误类型，包含了输入参数和错误信息，可以提供更丰富的错误信息和上下文
type argError struct {
	arg  int
	prob string
}

// 实现error接口的Error方法，使得argError类型可以作为错误使用
func (e *argError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.prob)
}

// 定义一个函数，接受一个整数参数，并返回一个整数结果和一个错误，使用了自定义的argError类型来表示错误，可以根据输入参数提供更多的错误信息和上下文
func f2(arg int) (int, error) {
	if arg == 42 {
		return -1, &argError{arg, fmt.Sprintf("can't work with %d", arg)}
	}
	return arg + 3, nil
}

func main() {
	for _, i := range []int{7, 42} {
		if r, e := f1(i); e != nil {
			fmt.Println("f1 failed:", e)
		} else {
			fmt.Println("f1 succeeded:", r)
		}
	}

	for _, i := range []int{7, 42} {
		if r, e := f2(i); e != nil {
			fmt.Println("f2 failed:", e)
		} else {
			fmt.Println("f2 succeeded:", r)
		}
	}

	_, e := f2(42)
	if ae, ok := e.(*argError); ok {
		fmt.Println("argError arg:", ae.arg)
		fmt.Println("argError prob:", ae.prob)
	}
}
```

在上面的代码中，我们定义了两个函数`f1`和`f2`，它们都接受一个整数参数并返回一个整数结果和一个错误。`f1`使用了内置的`error`接口来表示错误，而`f2`使用了自定义的`argError`类型来表示错误。可以发现使用自定义错误类型的`f2`函数能够提供更丰富的错误信息和上下文，使得调用者可以更好地理解错误的原因和如何处理它。

:::note
>可能有人认为上述`f2`当出现错误时返回值为`&argError{int, string}`，但是最后的输出却是调用了`Error()`方法返回的字符串，这是因为在Go语言中，当一个类型实现了`error`接口时，它会自动调用该类型的`Error()`方法来获取错误信息的字符串表示。因此，在`f2`函数中，当返回一个`*argError`类型的错误时，调用者在打印错误信息时会自动调用`Error()`方法来获取错误信息的字符串表示，而不是直接输出`*argError`类型的值。
>
>如果需要在程序中自定义错误类型的数据，需要使用类型断言来获取错误的具体类型，并访问其字段来获取相关数据。例如，在上面的代码中，我们使用了类型断言`e.(*argError)`来检查错误是否是`*argError`类型，如果是，则可以访问`arg`和`prob`字段来获取输入参数和错误信息。
:::