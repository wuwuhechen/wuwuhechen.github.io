---
title: Golang HTTP简单介绍
published: 2026-03-22
date: 2026-03-22
pinned: false
description: Golang中的HTTP处理方法和技巧。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-http
---

Golang中的HTTP处理是Go语言中非常重要的部分。Go语言提供了丰富的HTTP处理函数和方法，使得开发者能够方便地构建和处理HTTP请求和响应。本文将介绍Golang中的HTTP处理方法和技巧，帮助初学者理解和使用这些方法。

# HTTP客户端
在Go语言中，我们可以使用`net/http`包来构建HTTP客户端。`http.Get`函数可以发送一个GET请求并返回一个响应对象。下面是一个示例：

```go
package main

import (
	"bufio"
	"fmt"
	"net/http"
)

func main() {
	resp, err := http.Get("http://baidu.com")
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	fmt.Println("Response status: ", resp.Status)

	scanner := bufio.NewScanner(resp.Body)
	for i := 0; i < 5 && scanner.Scan(); i++ {
		fmt.Println(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

}
```

在上面的示例中，我们使用`http.Get`函数发送了一个GET请求到百度首页，并打印了响应状态码。我们还使用`bufio.Scanner`来读取响应体的前五行内容。

# HTTP服务器
Go语言还提供了`net/http`包来构建HTTP服务器。我们可以使用`http.HandleFunc`函数来定义一个处理函数，并使用`http.ListenAndServe`函数来启动服务器。下面是一个示例：

```go
package main

import (
	"fmt"
	"net/http"
)

func hello(w http.ResponseWriter, req *http.Request) {

	fmt.Fprintf(w, "hello\n")
}

func headers(w http.ResponseWriter, req *http.Request) {

	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func main() {

	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)

	http.ListenAndServe(":8090", nil)
}
```

在上面的示例中，我们定义了两个处理函数`hello`和`headers`，分别用于处理`/hello`和`/headers`路径的请求。我们使用`http.HandleFunc`函数来注册这些处理函数，并使用`http.ListenAndServe`函数来启动服务器，监听8090端口。

# context包
Go语言中的`context`包提供了一种机制来传递请求范围内的值、取消信号和截止日期。下面是一个示例：

```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

func hello(w http.ResponseWriter, req *http.Request) {

    // 获取请求的上下文
	ctx := req.Context()
	fmt.Println("server: hello handler started")
	defer fmt.Println("server: hello handler ended")

	select {
	case <-time.After(10 * time.Second):
		fmt.Fprintf(w, "hello\n")
	case <-ctx.Done():
        // 如果请求被取消，打印错误信息并返回500状态码
		err := ctx.Err()
		fmt.Println("server:", err)
		internalError := http.StatusInternalServerError
		http.Error(w, err.Error(), internalError)
	}
}

func main() {

	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8090", nil)
}
```

在上面的示例中，我们在处理函数`hello`中获取了请求的上下文，并使用`select`语句来等待10秒钟或者请求被取消。如果请求被取消，我们会打印错误信息并返回500状态码。

