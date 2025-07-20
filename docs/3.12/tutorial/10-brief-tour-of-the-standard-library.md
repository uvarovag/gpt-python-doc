# 10. Краткий обзор стандартной библиотеки

[Оригинал](https://docs.python.org/3.12/tutorial/stdlib.html)

Стандартная библиотека Python содержит большое количество модулей, упрощающих решение повседневных задач программирования.

## 10.1. Интерфейс операционной системы

Модуль `os` предоставляет функции для взаимодействия с операционной системой:

```python
import os
os.getcwd()       # Возвращает текущий рабочий каталог
os.chdir('/server/accesslogs')   # Изменяет текущий рабочий каталог
os.system('mkdir today')   # Выполняет команду mkdir в оболочке ОС
```

Рекомендуется использовать стиль импорта `import os`, чтобы избежать конфликтов имен функций модуля `os`.

Для работы с большими модулями удобно использовать встроенные функции `dir()` и `help()`:

```python
import os
dir(os)           # Выводит список всех функций модуля
help(os)          # Показывает подробную справку по модулю
```

Модуль `shutil` предлагает высокоуровневый интерфейс для управления файлами и директориями:

```python
import shutil
shutil.copyfile('data.db', 'archive.db')
shutil.move('/build/executables', 'installdir')
```

## 10.2. Шаблоны файлов

Модуль `glob` позволяет создавать списки файлов по шаблонам:

```python
import glob
glob.glob('*.py')  # ['primes.py', 'random.py', 'quote.py']
```

## 10.3. Аргументы командной строки

Аргументы командной строки хранятся в атрибуте `argv` модуля `sys`. Простейший пример обработки аргументов:

```python
import sys
print(sys.argv)  # [имя_скрипта, аргументы]
```

Пример вывода после запуска скрипта `python demo.py one two three`:

```python
['demo.py', 'one', 'two', 'three']
```

Более сложный механизм обработки аргументов доступен через модуль `argparse`:

```python
import argparse

parser = argparse.ArgumentParser(prog='top', description='Показать первые строки каждого файла')
parser.add_argument('filenames', nargs='+')
parser.add_argument('-l', '--lines', type=int, default=10)
args = parser.parse_args()
print(args)
```

При запуске команды `python top.py --lines=5 alpha.txt beta.txt` устанавливаются следующие параметры:

```python
args.lines == 5
args.filenames == ['alpha.txt', 'beta.txt']
```

## 10.4. Перенаправление ошибок и завершение программы

Модуль `sys` поддерживает перенаправление стандартных потоков ввода-вывода (`stdin`, `stdout`, `stderr`), что полезно для отображения предупреждающих сообщений даже при перенаправлении стандартного вывода:

```python
import sys
sys.stderr.write('Предупреждение, файл журнала не найден, создаётся новый\n')
```

Простое завершение программы выполняется функцией `sys.exit()`.

## 10.5. Поиск строковых паттернов

Модуль `re` обеспечивает инструменты регулярных выражений для поиска и замены сложных строковых шаблонов:

```python
import re
re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest')  # ['foot', 'fell', 'fastest']
re.sub(r'(\b[a-z]+) \1', r'\1', 'cat in the the hat')  # 'cat in the hat'
```

Однако для простых операций предпочтительнее использовать методы строк:

```python
'tea for too'.replace('too', 'two')  # 'tea for two'
```

## 10.6. Математика

Модуль `math` предоставляет доступ к функциям математики с плавающей точкой:

```python
import math
math.cos(math.pi / 4)  # 0.7071...
math.log(1024, 2)  # 10.0
```

Модуль `random` генерирует случайные числа и выборки:

```python
import random
random.choice(['apple', 'pear', 'banana'])  # 'apple'
random.sample(range(100), 10)  # [случайный набор чисел]
random.random()  # Случайное число типа float
random.randrange(6)  # Случайное целое число из диапазона
```

Модуль `statistics` вычисляет статистические показатели численных данных:

```python
import statistics
data = [2.75, 1.75, 1.25, 0.25, 0.5, 1.25, 3.5]
statistics.mean(data)  # Среднее значение
statistics.median(data)  # Медианное значение
statistics.variance(data)  # Дисперсия
```

## 10.7. Доступ в Интернет

Доступ к данным через HTTP и отправка электронной почты реализованы модулями `urllib.request` и `smtplib` соответственно:

```python
from urllib.request import urlopen
with urlopen('http://worldtimeapi.org/api/timezone/etc/UTC.txt') as response:
    for line in response:
        if line.startswith(b'datetime'):
            print(line.decode().rstrip())

import smtplib
server = smtplib.SMTP('localhost')
server.sendmail('soothsayer@example.org', 'jcaesar@example.org',
"""
К тебе обращается прорицатель.
Осторожней будь в мартовские Иды.
""")
server.quit()
```

## 10.8. Работа с датами и временем

Модуль `datetime` предоставляет классы для манипуляций с датами и временем:

```python
from datetime import date
now = date.today()
now.strftime("%m-%d-%y. %d %b %Y is a %A on the %d day of %B.")

birthday = date(1964, 7, 31)
age = now - birthday
age.days  # Количество дней между двумя датами
```

## 10.9. Сжатие данных

Поддерживаются популярные форматы архивации и сжатия данных: `zlib`, `gzip`, `bz2`, `lzma`, `zipfile`, `tarfile`:

```python
import zlib
s = b'witch which has which witches wrist watch'
len(s)  # 41 байт
t = zlib.compress(s)
len(t)  # 37 байт
zlib.decompress(t)  # Восстанавливаем исходную строку
zlib.crc32(s)  # Контрольная сумма CRC32
```

## 10.10. Измерение производительности

Модуль `timeit` измеряет время выполнения небольших фрагментов кода:

```python
from timeit import Timer
Timer('t=a; a=b; b=t', 'a=1; b=2').timeit()
Timer('a,b = b,a', 'a=1; b=2').timeit()
```

Модули `profile` и `pstats` позволяют профилировать производительность больших блоков кода.

## 10.11. Контроль качества

Модуль `doctest` проверяет тесты, встроенные прямо в docstrings функций:

```python
def average(values):
    """
    Вычисляет среднее арифметическое списка чисел.

    >>> print(average([20, 30, 70]))
    40.0
    """
    return sum(values) / len(values)

import doctest
doctest.testmod()
```

Модуль `unittest` предназначен для написания тестов в отдельных файлах:

```python
import unittest

class TestStatisticalFunctions(unittest.TestCase):
    def test_average(self):
        self.assertEqual(average([20, 30, 70]), 40.0)
        self.assertEqual(round(average([1, 5, 7]), 1), 4.3)
        with self.assertRaises(ZeroDivisionError):
            average([])
        with self.assertRaises(TypeError):
            average(20, 30, 70)

unittest.main()
```

## 10.12. Всё включено ("батарейки включены")

Философия Python — "всё включено". Примеры мощных пакетов стандартной библиотеки:

- Модули `xmlrpc.client` и `xmlrpc.server` обеспечивают удалённые вызовы процедур.
- Пакет `email` управляет структурой электронных писем, включая MIME и RFC 2822.
- Модуль `json` обрабатывает популярный формат обмена данными JSON.
- Модуль `csv` читает и записывает файлы формата CSV.
- Модуль `sqlite3` реализует поддержку базы данных SQLite.
- Международизация поддерживается пакетами `gettext`, `locale` и модулем `codecs`.
