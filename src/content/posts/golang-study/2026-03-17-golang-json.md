---
title: Golang JSON处理
published: 2026-03-17
date: 2026-03-17
pinned: false
description: Golang中的JSON处理方法和技巧。
tags: [Golang, 基础知识]
category: Golang
draft: true
permalink: golang-json
---

Golang中的JSON处理是Go语言中非常重要的部分。Go语言提供了丰富的JSON处理函数和方法，使得开发者能够方便地操作JSON数据。本文将介绍Golang中的JSON处理方法和技巧，帮助初学者理解和使用这些方法。

# JSON基本操作
Go语言中，我们可以使用`encoding/json`包来进行处理JSON数据。例如，`Marshal`函数可以将Go数据结构转换为JSON格式，`Unmarshal`函数可以将JSON数据解析为Go数据结构。下面是一些示例：

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type response1 struct {
	Page   int
	Fruits []string
}// 结构体字段必须以大写字母开头才能被JSON包访问

type response2 struct {
	Page   int      `json:"page"`
	Fruits []string `json:"fruits"`
}// 结构体标签用于指定JSON字段名

func main() {

    // JSON编码
	bolB, _ := json.Marshal(true)
	fmt.Println(string(bolB))

	intB, _ := json.Marshal(1)
	fmt.Println(string(intB))

	fltB, _ := json.Marshal(2.34)
	fmt.Println(string(fltB))

	strB, _ := json.Marshal("gopher")
	fmt.Println(string(strB))

	slcD := []string{"apple", "peach", "pear"}
	slcB, _ := json.Marshal(slcD)
	fmt.Println(string(slcB))

	mapD := map[string]int{"apple": 5, "lettuce": 7}
	mapB, _ := json.Marshal(mapD)
	fmt.Println(string(mapB))

    // 自定义结构体编码
	res1D := &response1{
		Page:   1,
		Fruits: []string{"apple", "peach", "pear"},
	}
	res1B, _ := json.Marshal(res1D)
	fmt.Println(string(res1B))

	res2D := &response2{
		Page:   1,
		Fruits: []string{"apple", "peach", "pear"},
	}
	res2B, _ := json.Marshal(res2D)
	fmt.Println(string(res2B))

    // JSON解码
	byt := []byte(`{"num":6.13,"strs":["a","b"]}`)

	var dat map[string]interface{}

	if err := json.Unmarshal(byt, &dat); err != nil {
		panic(err)
	}
	fmt.Println(dat)

	num := dat["num"].(float64)
	fmt.Println(num)
    
    // 类型断言将接口类型转换为具体类型，如果断言失败会引发panic
	strs := dat["strs"].([]interface{})
	str1 := strs[0].(string)
	fmt.Println(str1)

    // 直接解码到结构体
	str := `{"page": 1, "fruits": ["apple", "peach"]}`
	res := response2{}
	json.Unmarshal([]byte(str), &res)
	fmt.Println(res)
	fmt.Println(res.Fruits[0])
    
    // JSON编码器
	enc := json.NewEncoder(os.Stdout)
	d := map[string]int{"apple": 5, "lettuce": 7}
	enc.Encode(d)
}
```

在上面的代码中，我们定义了两个结构体`response1`和`response2`，并使用`json.Marshal`函数将不同类型的数据转换为JSON格式。我们还使用`json.Unmarshal`函数将JSON数据解析为Go数据结构，并通过类型断言来访问其中的值。最后，我们使用`json.NewEncoder`创建一个JSON编码器，并将数据直接写入标准输出。e