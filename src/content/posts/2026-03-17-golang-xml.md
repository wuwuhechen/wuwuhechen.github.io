---
title: Golang XML处理
published: 2026-03-17
date: 2026-03-17
pinned: false
description: Golang中的XML处理方法和技巧。
tags: [Golang, 基础知识]
category: Golang
draft: false
permalink: golang-xml
---

Golang中的XML处理是Go语言中非常重要的部分。Go语言提供了丰富的XML处理函数和方法，使得开发者能够方便地操作XML数据。本文将介绍Golang中的XML处理方法和技巧，帮助初学者理解和使用这些方法。

# XML基本操作
Go语言中，我们可以使用`encoding/xml`包来进行处理XML数据。例如，`Marshal`函数可以将Go数据结构转换为XML格式，`Unmarshal`函数可以将XML数据解析为Go数据结构。下面是一些示例：

```go
package main

import (
	"encoding/xml"
	"fmt"
	"os"
)

type Plant struct {
	XMLName xml.Name `xml:"plant"`
	Id      int      `xml:"id,attr"`
	Name    string   `xml:"name"`
	Origin  []string `xml:"origin"`
} // 结构体字段必须以大写字母开头才能被XML包访问，或者也可以使用结构体标签指定XML字段名

func (p Plant) String() string {
	return fmt.Sprintf("Plant id=%v, name=%v, origin=%v", p.Id, p.Name, p.Origin)
}

func main() {
	f, _ := os.Create("tmp.xml")
	defer f.Close()

	coffee := &Plant{Id: 27, Name: "coffee"}
	coffee.Origin = []string{"Ethiopia", "Brazil"}

	out, _ := xml.MarshalIndent(coffee, " ", "  ") // MarshalIndent函数可以生成格式化的XML输出
	fmt.Println(string(out))
	f.Write(out)
	f.WriteString("\n")
	f.WriteString("\n")

	fmt.Println(xml.Header + string(out))
	f.WriteString(xml.Header + string(out))
	f.WriteString("\n")
	f.WriteString("\n")// XML头部信息可以通过xml.Header常量获取

	var p Plant
	if err := xml.Unmarshal(out, &p); err != nil {
		panic(err)
	}
	fmt.Println(p)// Unmarshal函数可以将XML数据解析为Go数据结构

	tomato := &Plant{Id: 100, Name: "tomato"}
	tomato.Origin = []string{"Mexico", "California"}

	type Nesting struct {
		XMLName xml.Name `xml:"nesting"`
		Plants  []*Plant `xml:"plant>child>plant"`
	}// 嵌套结构体可以通过结构体标签指定XML路径来实现

	nesting := &Nesting{}
	nesting.Plants = []*Plant{coffee, tomato}

	out, _ = xml.MarshalIndent(nesting, " ", "  ")
	fmt.Println(string(out))
	f.Write(out)
}
```

在上面的示例中，我们定义了一个`Plant`结构体，并使用`xml.MarshalIndent`函数将其转换为XML格式。我们还使用了`xml.Unmarshal`函数将XML数据解析回Go数据结构。此外，我们还展示了如何处理嵌套结构体。
