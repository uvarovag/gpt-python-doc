# 5. Структуры данных

[Оригинал](https://docs.python.org/3.12/tutorial/datastructures.html)

Этот раздел описывает некоторые аспекты структур данных, изученные ранее, подробнее и добавляет новые сведения.

## 5.1. Списки

Тип данных список имеет дополнительные методы. Вот полный перечень методов объектов списка:

- **`list.append(x)`**: Добавляет элемент в конец списка. Аналогично `a[len(a):] = [x]`.
- **`list.extend(iterable)`**: Расширяет список элементами из итерации. Аналогично `a[len(a):] = iterable`.
- **`list.insert(i, x)`**: Вставляет элемент перед указанным индексом. Например, `a.insert(0, x)` вставляет элемент в начало списка, а `a.insert(len(a), x)` аналогичен методу `append`.
- **`list.remove(x)`**: Удаляет первый найденный элемент равный `x`. Если такого элемента нет, возникает исключение `ValueError`.
- **`list.pop([i])`**: Удаляет и возвращает элемент по указанному индексу. Без индекса удаляется последний элемент. Возникает ошибка `IndexError`, если список пуст или индекс вне диапазона.
- **`list.clear()`**: Полностью очищает список. Эквивалентно выражению `del a[:]`.
- **`list.index(x[, start[, end]])`**: Возвращает индекс первого элемента равного `x`. Опциональные аргументы `start` и `end` ограничивают область поиска.
- **`list.count(x)`**: Возвращает количество элементов равных `x`.
- **`list.sort(*, key=None, reverse=False)`**: Сортирует элементы списка на месте. Аргументы позволяют настраивать сортировку.
- **`list.reverse()`**: Меняет порядок элементов списка на противоположный.
- **`list.copy()`**: Создаёт поверхностную копию списка. Эквивалентно `a[:]`.

Пример использования большинства методов:

```python
fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']
print(fruits.count('apple')) # 2
print(fruits.count('tangerine')) # 0
print(fruits.index('banana')) # 3
print(fruits.index('banana', 4)) # 6
fruits.reverse()
print(fruits) # ['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange']
fruits.append('grape')
print(fruits) # ['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange', 'grape']
fruits.sort()
print(fruits) # ['apple', 'apple', 'banana', 'banana', 'grape', 'kiwi', 'orange', 'pear']
print(fruits.pop()) # pear
```

Методы типа `insert`, `remove`, `sort` возвращают значение `None`, поскольку списки являются изменяемыми структурами данных.

### 5.1.1. Использование списков как стека

Списки легко используются как стек ("LIFO"). Для добавления элемента используется метод `append`, а для извлечения последнего элемента — метод `pop`:

```python
stack = [3, 4, 5]
stack.append(6)
stack.append(7)
print(stack) # [3, 4, 5, 6, 7]
print(stack.pop()) # 7
print(stack.pop()) # 6
print(stack.pop()) # 5
print(stack) # [3, 4]
```

### 5.1.2. Использование списков как очереди

Хотя возможно использование списков как очередей ("FIFO"), оно неэффективно, так как операции вставки и удаления в начале списка медленные. Лучше использовать класс `collections.deque`:

```python
from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")
queue.append("Graham")
print(queue.popleft()) # Eric
print(queue.popleft()) # John
print(queue) # deque(['Michael', 'Terry', 'Graham'])
```

### 5.1.3. Генераторы списков

Генераторы списков предоставляют компактный способ создания списков. Они часто применяются для выполнения операций над каждым элементом другой последовательности или фильтрации элементов удовлетворяющих определённому условию.

Примеры генераторов списков:

```python
vec = [-4, -2, 0, 2, 4]
print([x * 2 for x in vec]) # [-8, -4, 0, 4, 8]
print([x for x in vec if x >= 0]) # [0, 2, 4]
print([abs(x) for x in vec]) # [4, 2, 0, 2, 4]

freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
print([weapon.strip() for weapon in freshfruit]) # ['banana', 'loganberry', 'passion fruit']

print([(x, x**2) for x in range(6)]) # [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]

from math import pi
print([str(round(pi, i)) for i in range(1, 6)]) # ['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

### 5.1.4. Вложенные генераторы списков

Начальное выражение генератора может содержать другой генератор списка. Например, транспонирование матрицы:

```python
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]

print([[row[i] for row in matrix] for i in range(4)])
# [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

Эквивалентная реализация через циклы:

```python
transposed = []
for i in range(4):
    transposed.append([row[i] for row in matrix])
print(transposed)
# [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

Также возможна запись через вложенные циклы:

```python
transposed = []
for i in range(4):
    transposed_row = []
    for row in matrix:
        transposed_row.append(row[i])
    transposed.append(transposed_row)
print(transposed)
# [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]]
```

Однако предпочтительнее использовать встроенную функцию `zip`:

```python
print(list(zip(*matrix)))
# [(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]
```

## 5.2. Оператор del

Оператор `del` позволяет удалять элементы из списка по индексу, срезам или очищать весь список целиком. Примеры использования оператора `del`:

```python
a = [-1, 1, 66.25, 333, 333, 1234.5]
del a[0]
print(a) # [1, 66.25, 333, 333, 1234.5]
del a[2:4]
print(a) # [1, 66.25, 1234.5]
del a[:]
print(a) # []
```

Оператор `del` также применяется для полного удаления переменной:

```python
del a
```

После этого обращение к имени `a` вызовет ошибку до повторного присвоения значения.

## 5.3. Кортежи и последовательности

Кортеж представляет собой последовательность значений, разделённых запятыми. Это неизменяемая структура данных, доступ к которой осуществляется через индексы или распаковку. Примеры кортежей:

```python
t = 12345, 54321, 'hello!'
print(t[0]) # 12345
print(t) # (12345, 54321, 'hello!')

u = t, (1, 2, 3, 4, 5)
print(u) # ((12345, 54321, 'hello!'), (1, 2, 3, 4, 5))

try:
    t[0] = 88888
except TypeError as e:
    print(e) # объект типа 'tuple' не поддерживает присваивание элементов

v = ([1, 2, 3], [3, 2, 1])
print(v) # ([1, 2, 3], [3, 2, 1])
```

При создании кортежей важно учитывать синтаксические особенности одиночных и пустых кортежей:

```python
empty = ()
singleton = 'hello',
print(len(empty)) # 0
print(len(singleton)) # 1
print(singleton) # ('hello',)
```

Операция упаковки кортежа объединяет несколько значений в один кортеж:

```python
t = 12345, 54321, 'hello!'
```

Распаковка кортежа извлекает отдельные значения обратно в переменные:

```python
x, y, z = t
```

## 5.4. Множества

Множество (`set`) является неупорядоченным набором уникальных элементов. Основные сценарии использования включают проверку принадлежности и удаление дубликатов. Поддерживаются стандартные математические операции объединения, пересечения, разности и симметричной разности множеств.

Создание множества выполняется фигурными скобками или функцией `set()`:

```python
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket) # {'orange', 'banana', 'pear', 'apple'}

print('orange' in basket) # True
print('crabgrass' in basket) # False

a = set('abracadabra')
b = set('alacazam')
print(a) # {'a', 'r', 'b', 'c', 'd'}
print(a - b) # {'r', 'd', 'b'}
print(a | b) # {'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
print(a & b) # {'a', 'c'}
print(a ^ b) # {'r', 'd', 'b', 'm', 'z', 'l'}
```

Поддерживается создание множеств с помощью генераторов:

```python
a = {x for x in 'abracadabra' if x not in 'abc'}
print(a) # {'r', 'd'}
```

## 5.5. Словари

Словарь (`dict`) хранит пары ключ-значение. Ключи должны быть уникальными и неизменяемого типа. Пустые словари создаются парой фигурных скобок `{}`.

Основные операции со словарями:

```python
tel = {'jack': 4098, 'sape': 4139}
tel['guido'] = 4127
print(tel) # {'jack': 4098, 'sape': 4139, 'guido': 4127}
print(tel['jack']) # 4098
del tel['sape']
tel['irv'] = 4127
print(tel) # {'jack': 4098, 'guido': 4127, 'irv': 4127}
print(sorted(tel)) # ['guido', 'irv', 'jack']
print('guido' in tel) # True
print('jack' not in tel) # False
```

Конструктор `dict()` создаёт словарь непосредственно из последовательностей пар ключ-значение:

```python
print(dict([('sape', 4139), ('guido', 4127), ('jack', 4098)]))
# {'sape': 4139, 'guido': 4127, 'jack': 4098}
```

Дополнительно поддерживаются словарные выражения:

```python
{x: x**2 for x in (2, 4, 6)}
# {2: 4, 4: 16, 6: 36}
```

Для простых строковых ключей удобно использовать именованные параметры:

```python
print(dict(sape=4139, guido=4127, jack=4098))
# {'sape': 4139, 'guido': 4127, 'jack': 4098}
```

## 5.6. Техники работы с циклами

Циклы позволяют эффективно обрабатывать данные различных типов. Рассмотрим основные техники:

- Перебор словарей с одновременной выдачей ключа и значения:

```python
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
# gallahad the pure
# robin the brave
```

- Получение позиции и значения одновременно с использованием функции `enumerate`:

```python
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)
# 0 tic
# 1 tac
# 2 toe
```

- Параллельный перебор нескольких последовательностей с помощью функции `zip`:

```python
questions = ['name', 'quest', 'favorite color']
answers = ['lancelot', 'the holy grail', 'blue']
for q, a in zip(questions, answers):
    print(f"What is your {q}?  It is {a}.")
# What is your name?  It is lancelot.
# What is your quest?  It is the holy grail.
# What is your favorite color?  It is blue.
```

- Обратный цикл с помощью функции `reversed`:

```python
for i in reversed(range(1, 10, 2)):
    print(i)
# 9
# 7
# 5
# 3
# 1
```

- Сортировка последовательности с последующим обходом:

```python
basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
for f in sorted(set(basket)):
    print(f)
# apple
# banana
# orange
# pear
```

## 5.7. Дополнительные условия

Условия в операторах `while` и `if` могут включать любые операторы сравнения, включая членство (`in`), идентичность (`is`) и цепочки сравнений.

Например, проверка условий:

```python
string1, string2, string3 = '', 'Trondheim', 'Hammer Dance'
non_null = string1 or string2 or string3
print(non_null) # Trondheim
```

## 5.8. Сравнение последовательностей и других типов

Последовательности сравниваются лексикографически: сначала сравниваются первые два элемента, затем следующие и так далее. Последовательность считается меньшей, если она короче другой и совпадает по первым элементам.

Примеры сравнения последовательностей одного типа:

```python
(1, 2, 3) < (1, 2, 4) # True
[1, 2, 3] < [1, 2, 4] # True
'ABC' < 'C' < 'Pascal' < 'Python' # True
(1, 2, 3, 4) < (1, 2, 4) # True
(1, 2) < (1, 2, -1) # True
(1, 2, 3) == (1.0, 2.0, 3.0) # True
(1, 2, ('aa', 'ab')) < (1, 2, ('abc', 'a'), 4) # True
```

Сравнения между объектами разных типов возможны, если объекты имеют соответствующие методы сравнения. В противном случае возникнет исключение `TypeError`.
