# 12. Виртуальные среды и пакеты

[Оригинал](https://docs.python.org/3.12/tutorial/venv.html)

## 12.1. Введение

Приложения на Python часто используют сторонние библиотеки и модули, отсутствующие в стандартной библиотеке. Приложение может требовать конкретную версию библиотеки, поскольку оно написано с использованием устаревшего интерфейса или зависит от исправления определённой ошибки.

Это означает, что одна установка Python не сможет удовлетворить требования всех приложений одновременно. Например, приложение А требует версию 1.0 модуля, а приложение Б — версию 2.0. Установка любой версии сделает одно из приложений непригодным для запуска.

Решение проблемы заключается в создании виртуальной среды — изолированного каталога, содержащего отдельную установку Python вместе с дополнительными пакетами.

Различные приложения могут использовать разные виртуальные окружения. Если приложению Б потребуется обновление до версии 3.0, это никак не повлияет на среду приложения А.

## 12.2. Создание виртуальных сред

Модуль для управления виртуальными окружениями называется `venv`. Модуль устанавливает версию Python, соответствующую исполняемому файлу (`python --version`). Например, выполнение команды через `python3.12` установит версию 3.12.

Для создания виртуального окружения выберите каталог и выполните команду:

```bash
python -m venv tutorial-env
```

Эта команда создаст директорию `tutorial-env`, если она ещё не существует, и внутри неё разместятся копии интерпретатора Python и вспомогательных файлов.

Распространённым расположением виртуальной среды является директория `.venv`. Это имя скрывает папку в оболочке и предотвращает конфликты с файлами определения переменных окружения `.env`.

После создания виртуальное окружение нужно активировать.

На Windows используйте:

```bash
tutorial-env\Scripts\activate
```

На Unix/MacOS используйте:

```bash
source tutorial-env/bin/activate
```

(Эти скрипты предназначены для оболочки Bash. Для оболочек csh или fish есть альтернативные сценарии активации.)

Активация меняет приглашение командной строки, указывая используемое виртуальное окружение, и настраивает среду таким образом, что запуск `python` обеспечивает доступ именно к этой установке Python.

Чтобы деактивировать виртуальную среду, введите:

```bash
deactivate
```

в терминале.

## 12.3. Управление пакетами с помощью pip

Пакеты устанавливаются, обновляются и удаляются программой `pip`. По умолчанию `pip` загружает пакеты из индекса пакетов Python (PyPI), доступного онлайн.

Основные команды `pip`:

- `install` — установить пакет
- `uninstall` — удалить пакет
- `freeze` — вывести список установленных пакетов
- `list` — показать установленные пакеты
- `show` — получить подробную информацию о пакете

Установка последней доступной версии пакета выполняется указанием имени пакета:

```bash
(tutorial-env)$ python -m pip install novas
Collecting novas
 Downloading novas-3.1.1.3.tar.gz (136 kB)
Installing collected packages: novas
 Running setup.py install for novas
Successfully installed novas-3.1.1.3
```

Можно указать точную версию пакета после оператора `==`:

```bash
(tutorial-env)$ python -m pip install requests==2.6.0
Collecting requests==2.6.0
 Using cached requests-2.6.0-py2.py3-none-any.whl
Installing collected packages: requests
Successfully installed requests-2.6.0
```

Команда `python -m pip install --upgrade` обновляет пакет до самой свежей версии:

```bash
(tutorial-env)$ python -m pip install --upgrade requests
Collecting requests
Installing collected packages: requests
 Found existing installation: requests 2.6.0
   Uninstalling requests-2.6.0:
     Successfully uninstalled requests-2.6.0
Successfully installed requests-2.7.0
```

Удаляет пакеты команда `python -m pip uninstall`, за которой следуют имена пакетов.

Получить информацию о конкретном пакете позволяет команда `python -m pip show`:

```bash
(tutorial-env)$ python -m pip show requests
---
Metadata-Version: 2.0
Name: requests
Version: 2.7.0
Summary: Python HTTP for Humans.
Home-page: http://python-requests.org
Author: Kenneth Reitz
Author-email: me@kennethreitz.com
License: Apache 2.0
Location: /Users/akuchling/envs/tutorial-env/lib/python3.4/site-packages
Requires:
```

Список всех установленных пакетов выводит команда `python -m pip list`:

```bash
(tutorial-env)$ python -m pip list
novas (3.1.1.3)
numpy (1.9.2)
pip (7.0.3)
requests (2.7.0)
setuptools (16.0)
```

Команда `python -m pip freeze` формирует аналогичный список установленных пакетов, пригодный для повторного использования командой установки:

```bash
(tutorial-env)$ python -m pip freeze > requirements.txt
(tutorial-env)$ cat requirements.txt
novas==3.1.1.3
numpy==1.9.2
requests==2.7.0
```

Файл `requirements.txt` можно добавить в систему контроля версий и распространять вместе с приложением. Пользователи смогут установить необходимые зависимости одной командой:

```bash
(tutorial-env)$ python -m pip install -r requirements.txt
```

У `pip` много дополнительных опций. Полное руководство доступно в разделе [«Установка модулей Python»](../installing/index.html#installing-index). Когда вы написали собственный пакет и хотите разместить его в индексе PyPI, ознакомьтесь с руководством по упаковке проектов Python.
