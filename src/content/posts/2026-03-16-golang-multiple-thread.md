---
title: Golang多线程相关知识介绍
published: 2026-03-16
date: 2026-03-16
pinned: false
description: 介绍Golang多线程相关的基本概念和常用的操作，帮助初学者理解和使用Golang的多线程机制。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-multiple-thread
---

Golang的多线程主要通过协程（goroutine）和通道（channel）来实现。协程是一种轻量级的线程，可以在同一地址空间内运行多个协程，而通道则是用于在协程之间进行通信和同步的工具，通道和协程的相关知识可以参考本人之前的文章<a href="/golang-channel/">通道和协程</a>。本文将介绍Golang多线程相关的基本概念和常用的操作，帮助初学者理解和使用Golang的多线程机制。

# Golang多线程的实现方式
## 使用工作池实现多线程
Golang的工作池（worker pool）是一种常见的多线程实现方式，它通过创建一组固定数量的协程来处理任务队列中的任务。工作池可以有效地控制并发的数量，避免过多的协程导致系统资源耗尽。下面是一个简单的示例，展示了如何使用工作池来实现多线程：

```go
package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Printf("worker %d started job %d\n", id, j)
		time.Sleep(time.Second)
		fmt.Printf("worker %d finished job %d\n", id, j)
		results <- j * 2
	}
}// 定义一个工作函数，接受一个工作ID、一个任务通道和一个结果通道

func main() {
	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}// 启动3个工作协程来处理任务

	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs)

	for a := 1; a <= numJobs; a++ {
		fmt.Printf("result: %d\n", <-results)
	}
}
```

在上面的代码中，我们定义了一个`worker`函数，它接受一个工作ID、一个任务通道和一个结果通道。在`main`函数中，我们创建了一个任务通道和一个结果通道，并启动了一个含有三个工作协程的工作池来处理任务。我们将任务发送到任务通道中，并在最后从结果通道中接收处理结果。不同通道之间通过协程进行通信，实现了多线程的效果。

:::note
>在上面的示例中，我们使用了一个带缓冲的通道来存储任务和结果，这样可以避免在发送任务或接收结果时发生阻塞。
>
>当我们运行该程序时，可以看到三个工作协程同时处理任务，并且结果是按照任务的顺序输出的，这说明工作池中的协程是并发执行的。而且相较于单线程处理任务，能明显看到工作池的效率提升。
:::

## 使用WaitGroup来等待多个协程完成任务
想要等待多个协程完成任务，我们可以使用`waitGroup`来实现。`waitGroup`是Go语言中的一个同步原语，它可以等待一组协程完成任务。下面是一个示例，展示了如何使用`waitGroup`来等待多个协程完成任务：

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int) {
	fmt.Printf("Worker %d starting\n", id)

	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\n", id)
}

func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			worker(id)
		}(i)// 可以使用闭包来实现waitgroup的等待机制，这样worker函数就不需要接受一个waitgroup参数了
	}
	wg.Wait()
}
```

在上面的代码中，我们定义了一个`worker`函数，它接受一个工作ID并模拟执行一些任务。在`main`函数中，我们创建了一个`waitGroup`实例，并启动了五个工作协程来执行任务。每当我们启动一个新的协程时，我们调用`wg.Add(1)`来增加等待的协程数量。在每个协程完成任务后，我们调用`wg.Done()`来减少等待的协程数量。最后，我们调用`wg.Wait()`来阻塞主函数，直到所有的协程都完成任务。

## 实现速率限制
考虑到服务器的资源限制，我们可能需要限制某些操作的速率，基于协程，通道和打点器，我们可以实现一个简单的速率限制器。下面是一个示例，展示了如何使用打点器来实现速率限制：

```go
package main

import (
    "fmt"
    "time"
)

func main() {

    requests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        requests <- i
    }
    close(requests)

    limiter := time.Tick(200 * time.Millisecond)

    for req := range requests {
        <-limiter
        fmt.Println("request", req, time.Now())
    }// 只有收到了limiter的通知，才会处理下一个请求，这样就实现了速率限制

    burstyLimiter := make(chan time.Time, 3) // 允许3个请求的突发

    for i := 0; i < 3; i++ {
        burstyLimiter <- time.Now()
    }

    go func() {
        for t := range time.Tick(200 * time.Millisecond) {
            burstyLimiter <- t
        }
    }()

    burstyRequests := make(chan int, 5)
    for i := 1; i <= 5; i++ {
        burstyRequests <- i
    }
    close(burstyRequests)
    for req := range burstyRequests {
        <-burstyLimiter
        fmt.Println("request", req, time.Now())
    }
}
```

在上面的代码中，我们实现了基本的速率限制，同时为了允许一定程度的突发请求，我们还实现了一个带有突发限制的速率限制器。通过使用打点器和通道，我们可以有效地控制请求的处理速率，避免过多的请求同时处理导致系统资源耗尽。

# 总结
Golang的多线程主要通过协程和通道来实现。我们可以使用工作池来处理任务队列中的任务，使用`waitGroup`来等待多个协程完成任务，以及使用打点器来实现速率限制。通过这些机制，我们可以有效地管理和控制多线程的执行，提高程序的性能和效率。
