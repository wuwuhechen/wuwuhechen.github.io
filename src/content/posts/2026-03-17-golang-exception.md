---
title: Golang异常与错误
published: 2026-03-17
date: 2026-03-17
pinned: false
description: Golang中的异常处理和错误处理机制。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-exception
---

Golang中的异常处理和错误处理机制是Go语言中非常重要的部分。Go语言没有传统意义上的异常机制，而是通过返回错误值来处理错误。这种设计使得代码更加清晰和可维护，同时也鼓励开发者在编写代码时考虑错误处理。本文将介绍Golang中的异常处理和错误处理机制，帮助初学者理解和使用这些机制。

# 异常及处理
## panic
在Go语言中，`panic`是一个内置函数，用于引发一个运行时错误。通常我们用它来表示正常运行中不应该出现的错误，或者我们不准备优雅处理的错误。当`panic`触发时，会输出一个错误信息，并且程序会崩溃。下面是一个示例：

```go
package main

import "os"

func main() {
	// panic("a problem")

	_, err := os.Create("/tmp/file")
	if err != nil {
		panic(err)
	}
}
```

在上面的代码中，我们尝试创建一个文件，如果创建失败，我们使用`panic`来引发一个错误。这样做会导致程序崩溃，并输出错误信息。

## Recover
`recover`是Go语言中的一个内置函数，用于从`panic`引发的异常中恢复。当一个函数发生`panic`时，如果在该函数或调用链中的某个函数中调用了`recover`，程序就不会崩溃，而是会继续执行。下面是一个示例：

```go
package main

import "fmt"

func mayPanic() {
	panic("Panic in mayPanic")
}

func main() {

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in main", r)
		}
	}()

	mayPanic()

	fmt.Println("After panic")
}
```

在上面的代码中，我们定义了一个函数`mayPanic`，它会引发一个`panic`。在`main`函数中，我们使用`defer`和匿名函数来调用`recover`，以捕获`panic`引发的异常。当`mayPanic`引发`panic`时，程序不会崩溃，而是会继续执行，并输出恢复的信息。

# 程序清理
`defer`是Go语言中的一个关键字，与其他语言的ensure和finally类似，用于在函数返回之前执行一些清理操作。无论函数是正常返回还是由于`panic`引发的异常返回，`defer`语句都会被执行。这使得我们可以确保资源的正确释放，例如关闭文件、释放锁等。下面是一个示例：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	f := createFile("../tmp/defer.txt")
	defer closeFile(f)
	writeFile(f)
}

func createFile(p string) *os.File {
	fmt.Println("creating")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintln(f, "data")
}

func closeFile(f *os.File) {
	fmt.Println("closing")
	err := f.Close()

	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(1)
	}
}
```

在上面的代码中，我们创建了一个文件，并使用`defer`来确保在函数返回之前关闭文件。无论`writeFile`函数是否成功执行，`closeFile`函数都会被调用，确保资源得到正确释放。

# 总结
Golang中的异常处理和错误处理机制是通过`panic`、`defer`和`recover`来实现的。`panic`用于引发异常，`defer`用于确保在函数返回之前执行清理操作，而`recover`用于从异常中恢复。理解和正确使用这些机制对于编写健壮和可靠的Go代码非常重要。通过合理地使用`panic`、`defer`和`recover`，我们可以有效地处理错误和异常，确保程序的稳定性和可维护性。