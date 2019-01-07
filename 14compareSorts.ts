/*
## compare 

https://www.toptal.com/developers/sorting-algorithms

sort   best avg  worst space
bubble n    n**2 n**2  1     ... ほぼソート済みの場合noswapを使えばbestがO(n)になる
insert n    n**2 n**2  1     ... ほぼソート済みの場合bestがO(n)になる. merge, quickなどと比べてもほぼソート済み時には最速
select n**2 n**2 n**2  1

- bubble: swapも多いし、noswap使わないとN**2の精査になる
- select: N**2の精査はあるが、swap回数が少ない
- insert: 最悪の場合がN**2であり、基本的にはN**2よりも少ない回数で1ループを負えられるため、この中では実際には高速。Big-Oでいうと同じだが。
*/