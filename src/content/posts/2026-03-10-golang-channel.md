---
title: Golang协程与通道的介绍和使用
published: 2026-03-10
date: 2026-03-10
pinned: false
description: 介绍Golang协程与通道的基本概念和常用的操作，帮助初学者理解和使用Golang的协程与通道机制。
tags: [Golang, 基础知识]
category: Golang
licenseName: Unlicensed
draft: false
permalink: golang-channel
---

Golang的协程（goroutine）和通道（channel）是Go语言中实现并发编程的核心机制。协程是一种轻量级的线程，可以在同一地址空间内运行多个协程，而通道则是用于在协程之间进行通信和同步的工具。本文将介绍Golang协程与通道的基本概念和常用的操作，帮助初学者理解和使用Golang的协程与通道机制。

# Golang协程的介绍和使用
Golang的协程是一种轻量级的线程，可以在同一地址空间内运行多个协程。协程的创建非常简单，只需要使用`go`关键字来启动一个函数作为协程即可。协程之间是独立的，可以同时执行多个协程，而不需要担心线程切换的开销。下面是一个简单的示例，展示了如何创建和使用Golang的协程：

```go
package main

import (
	"fmt"
	"time"
)

func f(from string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
		time.Sleep(100 * time.Millisecond)
	}
}

func main() {
	f("direct")

	go func(msg string) {
		fmt.Println(msg)
	}("going")// 使用匿名函数创建一个协程，并传递一个字符串参数

	go f("goroutine")// 启动一个新的协程来执行函数f，并传递一个字符串参数

	time.Sleep(time.Second) // 等待足够的时间让所有协程完成执行,否则主函数可能会在协程完成之前退出，导致协程无法执行完毕
	fmt.Println("done")
}
```

在上面的代码中，我们定义了一个函数`f`，它接受一个字符串参数并打印出一些信息。在`main`函数中，我们首先直接调用了函数`f`，然后使用`go`关键字启动了两个协程，一个是匿名函数协程，另一个是调用函数`f`的协程。最后，我们使用`time.Sleep`来等待足够的时间让所有协程完成执行，否则主函数可能会在协程完成之前退出，导致协程无法执行完毕。

:::note
>在主函数最开始的`f("direct")`调用是一个普通的函数调用，它会阻塞主函数直到执行完成，属于同步调用。而后面的两个`go`语句则是启动了两个协程，这些协程会在后台运行，不会阻塞主函数。
>
>当我们运行该程序时，可以看到两个协程的输出交错在一起，这说明它们是并发执行的。
:::

# Golang通道的介绍和使用
Golang的通道是一种用于在协程之间进行通信和同步的工具。通道可以让一个协程发送数据到另一个协程，或者从另一个协程接收数据。通道的使用非常简单，可以使用`make`函数来创建一个通道，并使用`<-`操作符来发送和接收数据。

## 通道的信息传递
我们使用`channel <- value`来发送数据到通道，使用`value := <-channel`来从通道接收数据。默认情况下，发送和接收操作都是阻塞的，这意味着发送者会等待直到有一个接收者准备好接收数据，反之亦然。这种机制使得通道成为协程之间进行同步的有效工具。

下面是一个简单的示例，展示了如何使用Golang的通道进行信息传递：

```go
package main

func main() {
	messages := make(chan string)

	go func() { messages <- "ping" }()

	msg := <-messages
	println(msg)
}
```

上面的代码中，我们创建了一个字符串类型的通道`messages`，然后启动了一个协程，在该协程中向通道发送了一个字符串"ping"。在主函数中，我们从通道接收了这个字符串，并打印出来。可以发现，发送和接收操作都是阻塞的，直到发送者和接收者都准备好进行通信时，数据才会被传递。同时直到主函数收到数据，才会执行下一步操作，这说明通道不仅可以传递数据，还可以用于协程之间的同步。


## 通道的缓冲
默认情况下，通道是无缓冲的，这意味着发送和接收操作都是阻塞的，直到有一个接收者准备好接收数据，或者有一个发送者准备好发送数据。我们也可以创建一个带缓冲的通道，这样发送操作就不会阻塞，直到缓冲区满了才会阻塞。下面是一个示例，展示了如何创建和使用带缓冲的通道：

```go
package main

import "fmt"

func main() {
	messages := make(chan string, 2)

	messages <- "buffered"
	messages <- "channel"

	fmt.Println(<-messages)
	fmt.Println(<-messages)
}
```

在上面的代码中，我们创建了一个带缓冲的字符串类型的通道`messages`，缓冲区大小为2。我们向通道发送了两个字符串"buffered"和"channel"，由于通道是带缓冲的，这些发送操作不会阻塞。然后我们从通道接收了这两个字符串，并打印出来。可以看到，带缓冲的通道允许我们在发送数据时不必等待接收者准备好，这对于某些场景下的并发编程非常有用。

## 通道的同步
通道不仅可以用于传递数据，还可以用于协程之间的同步。我们可以使用通道来确保某些操作在特定的顺序执行，或者等待某些事件发生。下面是一个示例，展示了如何使用通道进行同步：

```go
package main

import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Print("working...")
	time.Sleep(time.Second)
	fmt.Println("done")

	done <- true
}

func main() {
	done := make(chan bool, 1)
	go worker(done)

	<-done
}
```

在上面的代码中，我们采用`done`通道来同步主函数和工作协程。主函数在等待从`done`通道接收数据之前会被阻塞，直到工作协程完成任务并发送数据到通道。这种方式确保了主函数在工作协程完成之前不会继续执行，从而实现了协程之间的同步，按照这个逻辑，我们可以实现更复杂的并发控制。

## 通道的方向
当使用通道作为函数的参数时，我们可以指定通道的方向，即只读或只写，该特性可以提升通道的类型安全。我们可以使用`chan<-`来表示一个只写通道，使用`<-chan`来表示一个只读通道。下面是一个示例，展示了如何使用通道的方向：

```go
package main

import "fmt"

func ping(pings chan<- string, msg string) {
	pings <- msg
}

func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

func main() {
	pings := make(chan string, 1)
	pongs := make(chan string, 1)

	ping(pings, "passed message")
	pong(pings, pongs)
	fmt.Println(<-pongs)
}
```

在上面的代码中，我们定义了两个函数`ping`和`pong`，它们分别使用了只写通道和只读通道来进行通信。

:::note
在Go语言中，通道的方向并不是数据结构的实现，而是编译器在编译时执行的类型检查，无论何时，一个通道总是双向的。
:::

## 通道的选择器
Go语言的选择器（select）语句允许我们同时等待多个通道操作。当我们有多个通道需要监听时，选择器可以帮助我们处理这些通道的通信。

下面是一个示例，展示了如何使用选择器来同时等待多个通道操作：

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c1 := make(chan string)
	c2 := make(chan string)

	go func() {
		time.Sleep(1 * time.Second)
		c1 <- "one"
	}()

	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "two"
	}()

	for i := 0; i < 2; i++ {
		select {
		case msg1 := <-c1:
			fmt.Println("received", msg1)
		case msg2 := <-c2:
			fmt.Println("received", msg2)
		}
	}
}
```

在上面的代码中，我们创建了两个通道`c1`和`c2`，并启动了两个协程来向这些通道发送数据。我们使用一个循环和选择器来同时等待这两个通道的通信。当其中一个通道接收到数据时，选择器会执行相应的case语句，并打印出接收到的数据。通过选择器，我们可以轻松地处理多个通道的通信，而不需要使用复杂的同步机制。

## 通道的超时处理
超时对于一个需要链接外部资源或者有较长耗时操作的程序来说是非常重要的。得益于通道和选择器的组合，我们可以很方便地实现超时处理。

下面是一个示例，展示了如何使用通道和选择器来实现超时处理：

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c1 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		c1 <- "result 1"
	}()
	select {
	case res := <-c1:
		fmt.Println(res)
	case <-time.After(1 * time.Second):
		fmt.Println("timeout 1")
	}

	c2 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "result 2"
	}()
	select {
	case res := <-c2:
		fmt.Println(res)
	case <-time.After(3 * time.Second):
		fmt.Println("timeout 2")
	}

}
```

在上面代码中，创建了两个通道，同时通过一个计时器来实现了超时处理，当通道在设定时间内没有收到消息时就会触发超时，通过这种方式，我们可以轻松地实现对通道操作的超时处理。

## 非阻塞通道
常规的通道操作是阻塞的，这意味着发送者会等待直到有一个接收者准备好接收数据，然而，我们可以使用一个带`default`分支的选择器来实现非阻塞的通道操作。下面是一个示例，展示了如何使用选择器来实现非阻塞的通道操作：

```go
package main

import (
	"fmt"
)

func main() {
	messages := make(chan string)
	signals := make(chan bool)

	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	default:
		fmt.Println("no message received")
	}

	msg := "1"
	select {
	case messages <- msg:
		fmt.Println("sent message", msg)
	default:
		fmt.Println("no message sent")
	}

	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	case sig := <-signals:
		fmt.Println("received signal", sig)
	default:
		fmt.Println("no activity")
	}// 同时等待messages和signals通道的通信，如果没有任何一个通道准备好进行通信，就会执行default分支，打印出"no activity"
}
```

在上面的代码中，我们使用了带`default`分支的选择器来实现非阻塞的通道操作。当我们尝试从`messages`通道接收数据时，如果没有数据可用，选择器会执行`default`分支，打印出"no message received"。同样地，当我们尝试向`messages`通道发送数据时，如果没有接收者准备好接收数据，选择器会执行`default`分支，打印出"no message sent"。通过这种方式，我们可以实现非阻塞的通道操作，从而使得程序能够继续执行其他任务，而不必等待通道操作完成。

:::note
> 在最开始选择器中，由于没有发送者准备好发送数据，同时messages通道处于等待接受的阻塞状态，所以选择器会执行`default`分支，打印出"no message received"。
>
> 在第二个选择器中，我们尝试向`messages`通道发送数据，由于没有接收者准备好接收数据，所以选择器会执行`default`分支，打印出"no message sent"。
>
> 在第三个选择器中，我们同时等待`messages`通道和`signals`通道的通信，由于没有发送者准备好发送数据，同时两个通道都处于等待接受的阻塞状态，所以选择器会执行`default`分支，打印出"no activity"。
:::

## 通道的关闭
关闭意味着通道不再接受新的数据，但仍然可以从通道接收数据，直到通道中的数据被全部接收完毕。我们可以使用内置的`close`函数来关闭一个通道。下面是一个示例，展示了如何关闭一个通道：

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	jobs := make(chan int, 5)
	done := make(chan bool)

	go func() {
		for {
			j, more := <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true
				return
			}
		}
	}()

	for j := 1; j <= 3; j++ {
		jobs <- j
		fmt.Println("sent job", j)
		time.Sleep(time.Second)
	}
	close(jobs)
	fmt.Println("sent all jobs")

	<-done
}
```

在上面的代码中，我们创建了一个带缓冲的整数类型的通道`jobs`，并启动了一个协程来从该通道接收数据。当我们向`jobs`通道发送数据时，协程会打印出接收到的数据。当我们关闭`jobs`通道后，协程仍然会不断读取数据，直到数据完全被取出，并打印出"received all jobs"，然后向`done`通道发送一个信号，表示所有工作已经完成。最后，我们在主函数中等待从`done`通道接收信号，以确保所有工作都已经完成。

## 通道的遍历
当一个通道被关闭后，我们仍然可以从该通道接收数据，直到通道中的数据被全部接收完毕。我们可以使用`for range`循环来遍历一个通道，这样就不需要担心通道是否已经关闭了。下面是一个示例，展示了如何使用`for range`循环来遍历一个通道：

```go
package main

import "fmt"

func main() {
	queue := make(chan string, 2)
	queue <- "buffered"
	queue <- "channel"
	close(queue)

	for elem := range queue {
		fmt.Println(elem)
	}
}
```

在上面的代码中，我们创建了一个带缓冲的字符串类型的通道`queue`，并向该通道发送了两个字符串"buffered"和"channel"，然后关闭了该通道。当我们运行该程序时，可以看到输出了"buffered"和"channel"，这说明我们成功地遍历了一个已经关闭的通道。

# 总结
Golang的协程和通道是Go语言中实现并发编程的核心机制。协程是一种轻量级的线程，可以在同一地址空间内运行多个协程，而通道则是用于在协程之间进行通信和同步的工具。通过使用协程和通道，我们可以轻松地实现并发编程，处理多个任务，并且能够在不同的协程之间进行通信和同步。希望本文能够帮助初学者理解和使用Golang的协程与通道机制，从而更好地利用Go语言的并发编程能力。