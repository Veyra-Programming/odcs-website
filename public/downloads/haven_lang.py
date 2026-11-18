#!/usr/bin/env python3
"""
Haven Language v3.5 — Enterprise, Object-Oriented, General-Purpose & Continuity Toolchain + VM
Engineered for Enterprise Services, Web Applications, Data Engineering, and Digital Continuity.

Advanced Concepts Inspired by Enterprise Java, PHP, and Modern Systems:
  - Interfaces & Abstract Contracts: define interface <Name> / define contract <Name>
  - Enums & Type-Safe Constants: define enum <Name> with auto-assigned or explicit values
  - Enterprise Decorators: @memoize, @retry, @timed, @singleton, @deprecated
  - Fluent Stream API (Java Streams / Laravel Collections): Stream(items).filter().map().sort().to_list()
  - Inversion of Control & Dependency Injection: ServiceContainer for factories and singletons
  - Pub/Sub Event Bus: EventBus.on(event, handler) and EventBus.emit(event, payload)
  - Embedded SQL / Active Record: SqliteDatabase with query(), insert(), query_one(), and migrations
  - Asynchronous Parallel Concurrency: async_task(fn, *args) and run_parallel([t1, t2])
  - String Templating Engine: render_template("Hello {{name}}", {"name": "Alice"})
  - Full CLI Toolchain: run, compile, lint, test, repl, new, format, info
"""

from __future__ import annotations

import abc
import argparse
import ast
import base64
import concurrent.futures
import csv
import datetime
import enum
import functools
import hashlib
import io
import json
import math
import os
import pathlib
import platform
import re
import shutil
import sqlite3
import subprocess
import sys
import textwrap
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from dataclasses import dataclass, field, is_dataclass, asdict
from typing import Any, Callable, Dict, List, Optional, Tuple, Union


HAVEN_VERSION = "3.5.0"
HAVEN_CODENAME = "Enterprise Full-Stack Edition"


class HavenSyntaxError(SyntaxError):
    """Raised when Haven source cannot be cleanly lowered to executable AST."""


# ---------------------------------------------------------------------------
# Enterprise Runtime Prelude injected before executing Haven programs
# ---------------------------------------------------------------------------

HAVEN_PRELUDE = '''
import abc as _abc
import base64 as _b64
import concurrent.futures as _futures
import csv as _csv
import dataclasses as _dc
import datetime as _dt
import enum as _enum
import functools as _functools
import hashlib as _hashlib
import io as _io
import json as _json
import math as _math
import os as _os
import pathlib as _pathlib
import re as _re
import shutil as _shutil
import sqlite3 as _sqlite3
import subprocess as _subprocess
import sys as _sys
import time as _time
import urllib.error as _url_err
import urllib.parse as _url_parse
import urllib.request as _url_req
import uuid as _uuid
from typing import Any, Callable, Dict, List, Optional, Tuple, Union


# ---------------------------------------------------------------------------
# Enterprise Annotations & Decorators (Java / PHP / Python style)
# ---------------------------------------------------------------------------

abstractmethod = _abc.abstractmethod
abstract = _abc.abstractmethod


def memoize(fn):
    """Cache deterministic function calls based on argument hashes."""
    return _functools.lru_cache(maxsize=256)(fn)


def retry(attempts=3, delay_ms=50):
    """Automatically retry a failing function call with backoff."""
    def decorator(fn):
        @_functools.wraps(fn)
        def wrapper(*args, **kwargs):
            last_err = None
            max_att = max(1, int(attempts))
            for att in range(1, max_att + 1):
                try:
                    return fn(*args, **kwargs)
                except Exception as exc:
                    last_err = exc
                    if att < max_att:
                        _time.sleep(float(delay_ms) / 1000.0)
            raise last_err
        return wrapper
    return decorator


def timed(fn):
    """Log function execution duration in milliseconds."""
    @_functools.wraps(fn)
    def wrapper(*args, **kwargs):
        t0 = _time.time()
        res = fn(*args, **kwargs)
        dt_ms = (_time.time() - t0) * 1000.0
        print(f"[timed] {fn.__name__} completed in {dt_ms:.2f}ms")
        return res
    return wrapper


def singleton(cls):
    """Ensure a class only ever has a single instantiated instance."""
    instances = {}
    @_functools.wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance


def deprecated(reason="This function is deprecated."):
    """Emit warning on calls to deprecated routines."""
    def decorator(fn):
        @_functools.wraps(fn)
        def wrapper(*args, **kwargs):
            print(f"[DeprecatedWarning] {fn.__name__}: {reason}", file=_sys.stderr)
            return fn(*args, **kwargs)
        return wrapper
    return decorator


# ---------------------------------------------------------------------------
# Fluent Stream API (Java Stream / PHP Laravel Collection style)
# ---------------------------------------------------------------------------

class Stream:
    """Fluent chaining pipeline for collections."""
    def __init__(self, iterable):
        self._items = list(iterable) if not isinstance(iterable, list) else iterable

    def filter(self, predicate):
        return Stream([x for x in self._items if predicate(x)])

    def map(self, transform):
        return Stream([transform(x) for x in self._items])

    def flat_map(self, transform):
        out = []
        for x in self._items:
            res = transform(x)
            if isinstance(res, (list, tuple)):
                out.extend(res)
            else:
                out.append(res)
        return Stream(out)

    def sort(self, key_fn=None, descending=False):
        return Stream(sorted(self._items, key=key_fn, reverse=descending))

    def unique(self):
        return Stream(unique_items(self._items))

    def take(self, n):
        return Stream(self._items[:int(n)])

    def drop(self, n):
        return Stream(self._items[int(n):])

    def chunk(self, size):
        return Stream(chunk_by(self._items, size))

    def for_each(self, action):
        for x in self._items:
            action(x)
        return self

    def reduce(self, reducer, initial=None):
        if initial is not None:
            return _functools.reduce(reducer, self._items, initial)
        return _functools.reduce(reducer, self._items)

    def count(self):
        return len(self._items)

    def sum(self):
        return sum(self._items)

    def average(self):
        return average(self._items)

    def min(self):
        return min(self._items)

    def max(self):
        return max(self._items)

    def first(self, default=None):
        return self._items[0] if self._items else default

    def last(self, default=None):
        return self._items[-1] if self._items else default

    def to_list(self):
        return list(self._items)

    def to_dict(self, key_fn, val_fn=None):
        if val_fn:
            return {key_fn(x): val_fn(x) for x in self._items}
        return {key_fn(x): x for x in self._items}

    def join(self, delimiter=", "):
        return str(delimiter).join(str(x) for x in self._items)

    def __iter__(self):
        return iter(self._items)

    def __len__(self):
        return len(self._items)

    def __repr__(self):
        return f"Stream({self._items!r})"


Collection = Stream


# ---------------------------------------------------------------------------
# Dependency Injection / Service Container (Spring / Laravel style)
# ---------------------------------------------------------------------------

class ServiceContainer:
    """Dependency Injection and Inversion of Control service registry."""
    _default_instance = None

    def __init__(self):
        self._factories = {}
        self._singletons = {}
        self._instances = {}

    @classmethod
    def default(cls):
        if cls._default_instance is None:
            cls._default_instance = cls()
        return cls._default_instance

    def register(self, name, factory):
        self._factories[str(name)] = factory
        return self

    def singleton(self, name, factory):
        self._singletons[str(name)] = factory
        return self

    def instance(self, name, instance_obj):
        self._instances[str(name)] = instance_obj
        return self

    def resolve(self, name):
        s = str(name)
        if s in self._instances:
            return self._instances[s]
        if s in self._singletons:
            obj = self._singletons[s]()
            self._instances[s] = obj
            return obj
        if s in self._factories:
            return self._factories[s]()
        raise KeyError(f"Service '{s}' is not registered in ServiceContainer.")

    def has(self, name):
        s = str(name)
        return s in self._instances or s in self._singletons or s in self._factories


# ---------------------------------------------------------------------------
# Pub/Sub Event Bus (Spring EventPublisher / Laravel EventBus style)
# ---------------------------------------------------------------------------

class EventBus:
    """Process-wide synchronous/asynchronous Event Bus."""
    _listeners = {}

    @classmethod
    def on(cls, event_name, callback):
        ev = str(event_name)
        if ev not in cls._listeners:
            cls._listeners[ev] = []
        cls._listeners[ev].append(callback)

    @classmethod
    def emit(cls, event_name, payload=None):
        ev = str(event_name)
        results = []
        for cb in cls._listeners.get(ev, []):
            try:
                res = cb(payload) if payload is not None else cb()
                results.append(res)
            except Exception as exc:
                print(f"[EventBus Error in listener for '{ev}']: {exc}", file=_sys.stderr)
        return results

    @classmethod
    def clear(cls, event_name=None):
        if event_name is None:
            cls._listeners.clear()
        else:
            cls._listeners.pop(str(event_name), None)


# ---------------------------------------------------------------------------
# SQLite Active Record / Database Helper (PDO / Hibernate style)
# ---------------------------------------------------------------------------

class SqliteDatabase:
    """Lightweight zero-dependency SQL database manager."""
    def __init__(self, db_path=":memory:"):
        self.db_path = str(db_path)
        self.conn = _sqlite3.connect(self.db_path)
        self.conn.row_factory = _sqlite3.Row

    def execute(self, sql, params=()):
        with self.conn:
            cur = self.conn.cursor()
            cur.execute(str(sql), tuple(params))
            return cur

    def query(self, sql, params=()):
        cur = self.execute(sql, params)
        return [dict(row) for row in cur.fetchall()]

    def query_one(self, sql, params=()):
        cur = self.execute(sql, params)
        row = cur.fetchone()
        return dict(row) if row else None

    def insert(self, table_name, data):
        columns = list(data.keys())
        placeholders = ", ".join(["?"] * len(columns))
        col_names = ", ".join(columns)
        sql = f"INSERT INTO {table_name} ({col_names}) VALUES ({placeholders})"
        cur = self.execute(sql, tuple(data.values()))
        return cur.lastrowid

    def close(self):
        self.conn.close()


# ---------------------------------------------------------------------------
# Asynchronous Concurrency & Thread Pooling (CompletableFuture / Fibers style)
# ---------------------------------------------------------------------------

_HAVEN_EXECUTOR = None


def _get_executor():
    global _HAVEN_EXECUTOR
    if _HAVEN_EXECUTOR is None:
        _HAVEN_EXECUTOR = _futures.ThreadPoolExecutor(max_workers=16, thread_name_prefix="haven-worker")
    return _HAVEN_EXECUTOR


class FutureTask:
    def __init__(self, future):
        self._future = future

    def await_result(self, timeout=None):
        return self._future.result(timeout=timeout)

    def is_done(self):
        return self._future.done()


def async_task(fn, *args, **kwargs):
    executor = _get_executor()
    fut = executor.submit(fn, *args, **kwargs)
    return FutureTask(fut)


def run_parallel(tasks):
    executor = _get_executor()
    futures = [executor.submit(t) if callable(t) else t for t in tasks]
    return [f.result() for f in futures]


# ---------------------------------------------------------------------------
# String Templating Engine (PHP Blade / Java Velocity style)
# ---------------------------------------------------------------------------

def render_template(template_str, context):
    res = str(template_str)
    for k, v in context.items():
        res = res.replace("{{" + str(k) + "}}", str(v))
        res = res.replace("{{ " + str(k) + " }}", str(v))
        res = res.replace("{" + str(k) + "}", str(v))
    return _HavenStr(res)


# ---------------------------------------------------------------------------
# General-Purpose Math & Numerical Functions
# ---------------------------------------------------------------------------

PI = _math.pi
EULER_E = _math.e


def sqrt(x):
    return _math.sqrt(float(x))


def power(base, exp):
    return _math.pow(float(base), float(exp))


def abs_val(x):
    return abs(x)


def floor(x):
    return _math.floor(float(x))


def ceil(x):
    return _math.ceil(float(x))


def round_to(x, digits=0):
    d = int(digits)
    return round(float(x), d) if d > 0 else int(round(float(x)))


def clamp(val, min_val, max_val):
    return max(min_val, min(max_val, val))


def sin(x):
    return _math.sin(float(x))


def cos(x):
    return _math.cos(float(x))


def tan(x):
    return _math.tan(float(x))


def range_of(start, end=None, step=1):
    st = int(step)
    if end is None:
        return list(range(int(start)))
    stop = int(end) + (1 if st > 0 else -1)
    return list(range(int(start), stop, st))


# ---------------------------------------------------------------------------
# JSON & CSV Data Processing
# ---------------------------------------------------------------------------

def parse_json(text):
    if isinstance(text, (dict, list)):
        return text
    return _json.loads(str(text))


def to_json(obj, indent=2):
    if hasattr(obj, "to_dict"):
        obj = obj.to_dict()
    elif _dc.is_dataclass(obj):
        obj = _dc.asdict(obj)
    return _json.dumps(obj, indent=int(indent), sort_keys=True, default=str)


def to_compact_json(obj):
    return canonical_json(obj)


def read_csv(path):
    with open(str(path), "r", encoding="utf-8") as f:
        reader = _csv.DictReader(f)
        return [dict(row) for row in reader]


def write_csv(path, rows, headers=None):
    if not rows:
        return 0
    if headers is None:
        if isinstance(rows[0], dict):
            headers = list(rows[0].keys())
        else:
            headers = [f"col_{i}" for i in range(len(rows[0]))]
    with open(str(path), "w", encoding="utf-8", newline="") as f:
        if isinstance(rows[0], dict):
            writer = _csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(rows)
        else:
            writer = _csv.writer(f)
            writer.writerow(headers)
            writer.writerows(rows)
    return len(rows)


# ---------------------------------------------------------------------------
# HTTP & Web Networking
# ---------------------------------------------------------------------------

def fetch_get(url, headers=None, timeout=10):
    req_headers = {"User-Agent": f"Haven-Language/{HAVEN_VERSION}"}
    if headers and isinstance(headers, dict):
        req_headers.update(headers)
    req = _url_req.Request(str(url), headers=req_headers, method="GET")
    try:
        with _url_req.urlopen(req, timeout=float(timeout)) as resp:
            status = resp.status
            body_bytes = resp.read()
            body_text = _HavenStr(body_bytes.decode("utf-8", errors="replace"))
            parsed_json = None
            try:
                parsed_json = _json.loads(body_text)
            except Exception:
                pass
            return {
                "status": status,
                "ok": 200 <= status < 300,
                "text": body_text,
                "json": parsed_json,
                "headers": dict(resp.headers),
            }
    except _url_err.HTTPError as exc:
        err_text = exc.read().decode("utf-8", errors="replace")
        return {
            "status": exc.code,
            "ok": False,
            "text": _HavenStr(err_text),
            "json": None,
            "headers": dict(exc.headers),
            "error": str(exc),
        }
    except Exception as exc:
        return {
            "status": 0,
            "ok": False,
            "text": _HavenStr(""),
            "json": None,
            "headers": {},
            "error": str(exc),
        }


def fetch_post(url, payload=None, headers=None, timeout=10):
    req_headers = {"User-Agent": f"Haven-Language/{HAVEN_VERSION}"}
    if headers and isinstance(headers, dict):
        req_headers.update(headers)
    body_bytes = b""
    if payload is not None:
        if isinstance(payload, (dict, list)):
            body_bytes = _json.dumps(payload).encode("utf-8")
            if "Content-Type" not in req_headers:
                req_headers["Content-Type"] = "application/json"
        elif isinstance(payload, str):
            body_bytes = payload.encode("utf-8")
        elif isinstance(payload, bytes):
            body_bytes = payload
    req = _url_req.Request(str(url), data=body_bytes, headers=req_headers, method="POST")
    try:
        with _url_req.urlopen(req, timeout=float(timeout)) as resp:
            status = resp.status
            resp_bytes = resp.read()
            resp_text = _HavenStr(resp_bytes.decode("utf-8", errors="replace"))
            parsed_json = None
            try:
                parsed_json = _json.loads(resp_text)
            except Exception:
                pass
            return {
                "status": status,
                "ok": 200 <= status < 300,
                "text": resp_text,
                "json": parsed_json,
                "headers": dict(resp.headers),
            }
    except _url_err.HTTPError as exc:
        err_text = exc.read().decode("utf-8", errors="replace")
        return {
            "status": exc.code,
            "ok": False,
            "text": _HavenStr(err_text),
            "json": None,
            "headers": dict(exc.headers),
            "error": str(exc),
        }
    except Exception as exc:
        return {
            "status": 0,
            "ok": False,
            "text": _HavenStr(""),
            "json": None,
            "headers": {},
            "error": str(exc),
        }


def fetch_json(url, headers=None, timeout=10):
    res = fetch_get(url, headers=headers, timeout=timeout)
    if res["ok"] and res["json"] is not None:
        return res["json"]
    return None


# ---------------------------------------------------------------------------
# Operating System & Filesystem Automation
# ---------------------------------------------------------------------------

def current_directory():
    return _HavenStr(_os.getcwd())


def list_directory(path="."):
    return [_HavenStr(item) for item in sorted(_os.listdir(str(path)))]


def file_exists(path):
    return _os.path.isfile(str(path))


def directory_exists(path):
    return _os.path.isdir(str(path))


def create_directory(path):
    _os.makedirs(str(path), exist_ok=True)
    return True


def delete_file(path):
    p = str(path)
    if _os.path.exists(p):
        if _os.path.isdir(p):
            _shutil.rmtree(p)
        else:
            _os.remove(p)
        return True
    return False


def file_size(path):
    p = str(path)
    return _os.path.getsize(p) if _os.path.exists(p) else 0


def file_extension(path):
    return _HavenStr(_pathlib.Path(str(path)).suffix)


def file_name(path):
    return _HavenStr(_pathlib.Path(str(path)).name)


def path_join(*parts):
    return _HavenStr(_os.path.join(*(str(p) for p in parts)))


def read_lines(path):
    with open(str(path), "r", encoding="utf-8") as f:
        return [_HavenStr(line.rstrip("\\r\\n")) for line in f]


def write_lines(path, lines):
    with open(str(path), "w", encoding="utf-8") as f:
        for line in lines:
            f.write(str(line) + "\\n")
    return len(lines)


def execute_command(command):
    res = _subprocess.run(str(command), shell=True, capture_output=True, text=True)
    return {
        "exit_code": res.returncode,
        "ok": res.returncode == 0,
        "stdout": _HavenStr(res.stdout),
        "stderr": _HavenStr(res.stderr),
    }


# ---------------------------------------------------------------------------
# Date & Time Utilities
# ---------------------------------------------------------------------------

def current_date():
    return _HavenStr(_dt.datetime.now().strftime("%Y-%m-%d"))


def current_time():
    return _HavenStr(_dt.datetime.now().strftime("%H:%M:%S"))


def current_timestamp():
    return _time.time()


def format_timestamp(ts, format_str="%Y-%m-%d %H:%M:%S"):
    return _HavenStr(_dt.datetime.fromtimestamp(float(ts)).strftime(str(format_str)))


def parse_date(date_str, format_str="%Y-%m-%d"):
    return _dt.datetime.strptime(str(date_str), str(format_str)).timestamp()


# ---------------------------------------------------------------------------
# Cryptography, Hashing & Encodings
# ---------------------------------------------------------------------------

def base64_encode(value):
    raw = value.encode("utf-8") if isinstance(value, str) else bytes(value)
    return _HavenStr(_b64.b64encode(raw).decode("ascii"))


def base64_decode(encoded_str):
    raw = _b64.b64decode(str(encoded_str).encode("ascii"))
    return _HavenStr(raw.decode("utf-8", errors="replace"))


def hash_sha512(value):
    raw = value.encode("utf-8") if isinstance(value, str) else canonical_json(value).encode("utf-8")
    return _hashlib.sha512(raw).hexdigest()


def hash_md5(value):
    raw = value.encode("utf-8") if isinstance(value, str) else canonical_json(value).encode("utf-8")
    return _hashlib.md5(raw).hexdigest()


def hash_sha256(value):
    return seal_hash(value)


def url_encode(text):
    return _HavenStr(_url_parse.quote(str(text)))


def url_decode(encoded_text):
    return _HavenStr(_url_parse.unquote(str(encoded_text)))


# ---------------------------------------------------------------------------
# Regex & Text Utilities
# ---------------------------------------------------------------------------

def regex_match(pattern, text):
    return bool(_re.search(str(pattern), str(text)))


def regex_find(pattern, text):
    m = _re.search(str(pattern), str(text))
    return _HavenStr(m.group(0)) if m else None


def regex_find_all(pattern, text):
    return [_HavenStr(m) for m in _re.findall(str(pattern), str(text))]


def regex_replace(pattern, replacement, text):
    return _HavenStr(_re.sub(str(pattern), str(replacement), str(text)))


def snake_case(text):
    s = _re.sub(r"([A-Z]+)([A-Z][a-z])", r"\\1_\\2", str(text))
    s = _re.sub(r"([a-z\\d])([A-Z])", r"\\1_\\2", s)
    return _HavenStr(s.replace("-", "_").replace(" ", "_").lower())


def camel_case(text):
    words = str(text).replace("-", " ").replace("_", " ").split()
    if not words:
        return _HavenStr("")
    return _HavenStr(words[0].lower() + "".join(w.capitalize() for w in words[1:]))


def kebab_case(text):
    return _HavenStr(snake_case(text).replace("_", "-"))


def title_case(text):
    return _HavenStr(str(text).title())


# ---------------------------------------------------------------------------
# Safe Fallbacks & File Helpers
# ---------------------------------------------------------------------------

def _haven_coalesce(primary, fallback):
    if primary is not None:
        return primary
    if callable(fallback):
        return fallback()
    return fallback


def _haven_save_file(path, content):
    if not isinstance(content, str):
        content = canonical_json(content)
    with open(str(path), "w", encoding="utf-8") as f:
        f.write(content)
    return len(content)


def _haven_append_file(path, content):
    if not isinstance(content, str):
        content = canonical_json(content)
    with open(str(path), "a", encoding="utf-8") as f:
        f.write(content)
    return len(content)


def _haven_read_file(path):
    with open(str(path), "r", encoding="utf-8") as f:
        return _HavenStr(f.read())


class _HavenStr(str):
    """Enriched string with fluent method chaining."""
    def trim(self):
        return _HavenStr(self.strip())

    def to_uppercase(self):
        return _HavenStr(self.upper())

    def to_lowercase(self):
        return _HavenStr(self.lower())

    def contains(self, sub):
        return str(sub) in self

    def starts_with(self, prefix):
        return self.startswith(str(prefix))

    def ends_with(self, suffix):
        return self.endswith(str(suffix))

    def split_by(self, sep=" "):
        return [_HavenStr(s) for s in self.split(str(sep))]

    def replace_text(self, old_val, new_val):
        return _HavenStr(self.replace(str(old_val), str(new_val)))

    def pad_left(self, width, fill=" "):
        return _HavenStr(self.rjust(int(width), str(fill)))

    def pad_right(self, width, fill=" "):
        return _HavenStr(self.ljust(int(width), str(fill)))

    def to_snake_case(self):
        return snake_case(self)

    def to_camel_case(self):
        return camel_case(self)

    def to_kebab_case(self):
        return kebab_case(self)

    def to_title_case(self):
        return title_case(self)

    def to_base64(self):
        return base64_encode(self)

    def from_base64(self):
        return base64_decode(self)

    def to_int(self, default=0):
        try:
            return int(self)
        except ValueError:
            return default

    def to_float(self, default=0.0):
        try:
            return float(self)
        except ValueError:
            return default

    def sha256(self):
        return hash_sha256(self)


def trim(value):
    return _HavenStr(str(value).strip())


def uppercase(value):
    return _HavenStr(str(value).upper())


def lowercase(value):
    return _HavenStr(str(value).lower())


def contains_text(text, substring):
    return str(substring) in str(text)


def starts_with(text, prefix):
    return str(text).startswith(str(prefix))


def ends_with(text, suffix):
    return str(text).endswith(str(suffix))


def split_by(text, delimiter=" "):
    return [_HavenStr(s) for s in str(text).split(str(delimiter))]


def replace_text(text, old_val, new_val):
    return _HavenStr(str(text).replace(str(old_val), str(new_val)))


def pad_left(text, width, fill_char=" "):
    return _HavenStr(str(text).rjust(int(width), str(fill_char)))


def pad_right(text, width, fill_char=" "):
    return _HavenStr(str(text).ljust(int(width), str(fill_char)))


def capitalize_text(text):
    return _HavenStr(str(text).capitalize())


def String(value):
    return _HavenStr(str(value))


def Integer(value):
    return int(value)


def Float(value):
    return float(value)


def Boolean(value):
    return bool(value)


# ---------------------------------------------------------------------------
# Functional Collection Utilities & Statistics
# ---------------------------------------------------------------------------

def filter_by(coll, predicate):
    return [x for x in coll if predicate(x)]


def map_by(coll, transform):
    return [transform(x) for x in coll]


def take_first(coll, n):
    return list(coll)[:int(n)]


def drop_first(coll, n):
    return list(coll)[int(n):]


def sort_by(coll, key_fn=None, descending=False):
    if key_fn is None or key_fn == "asc":
        return sorted(list(coll), reverse=descending)
    if key_fn == "desc":
        return sorted(list(coll), reverse=True)
    return sorted(list(coll), key=key_fn, reverse=descending)


def reverse_items(coll):
    return list(reversed(list(coll)))


def unique_items(coll):
    seen = set()
    out = []
    for x in coll:
        try:
            h = x
            if h not in seen:
                seen.add(h)
                out.append(x)
        except TypeError:
            key = canonical_json(x)
            if key not in seen:
                seen.add(key)
                out.append(x)
    return out


def sum_all(coll):
    return sum(coll)


def average(coll):
    c = list(coll)
    return (sum(c) / len(c)) if c else 0.0


def mean(coll):
    return average(coll)


def median(coll):
    c = sorted(list(coll))
    if not c:
        return 0.0
    n = len(c)
    mid = n // 2
    return (c[mid] if n % 2 == 1 else (c[mid - 1] + c[mid]) / 2.0)


def variance(coll):
    c = list(coll)
    if len(c) < 2:
        return 0.0
    m = average(c)
    return sum((x - m) ** 2 for x in c) / (len(c) - 1)


def stdev(coll):
    return _math.sqrt(variance(coll))


def minimum_of(coll):
    return min(coll)


def maximum_of(coll):
    return max(coll)


def join_with(coll, sep=""):
    return str(sep).join(str(x) for x in coll)


def tally(coll):
    counts = {}
    for x in coll:
        counts[x] = counts.get(x, 0) + 1
    return counts


def chunk_by(coll, chunk_size):
    size = max(1, int(chunk_size))
    c = list(coll)
    return [c[i:i + size] for i in range(0, len(c), size)]


def zip_with(coll_a, coll_b):
    return list(zip(coll_a, coll_b))


# ---------------------------------------------------------------------------
# Digital Continuity, Immutability & Cryptography
# ---------------------------------------------------------------------------

class ContinuityImmutabilityError(Exception):
    """Raised when attempting to mutate a sealed immutable durable record."""


def canonical_json(obj):
    if hasattr(obj, "to_dict"):
        obj = obj.to_dict()
    elif _dc.is_dataclass(obj):
        obj = _dc.asdict(obj)
    return _json.dumps(obj, sort_keys=True, separators=(",", ":"), default=str)


def seal_hash(value):
    if isinstance(value, str):
        raw = value.encode("utf-8")
    else:
        raw = canonical_json(value).encode("utf-8")
    return _hashlib.sha256(raw).hexdigest()


def merkle_root(items):
    if not items:
        return seal_hash("EMPTY_MERKLE_ROOT")
    level = [seal_hash(i) for i in items]
    while len(level) > 1:
        if len(level) % 2 == 1:
            level.append(level[-1])
        next_level = []
        for idx in range(0, len(level), 2):
            next_level.append(_hashlib.sha256((level[idx] + level[idx + 1]).encode("utf-8")).hexdigest())
        level = next_level
    return level[0]


def uuid7():
    ts_ms = int(_time.time() * 1000) & ((1 << 48) - 1)
    rand_bytes = _uuid.uuid4().bytes
    b = bytearray(rand_bytes)
    b[0:6] = ts_ms.to_bytes(6, "big")
    b[6] = (b[6] & 0x0F) | 0x70
    b[8] = (b[8] & 0x3F) | 0x80
    return str(_uuid.UUID(bytes=bytes(b)))


def now_ms():
    return int(_time.time() * 1000)


def now_iso():
    return _time.strftime("%Y-%m-%dT%H:%M:%SZ", _time.gmtime())


def seconds(n):
    return float(n)


def milliseconds(n):
    return float(n) / 1000.0


def minutes(n):
    return float(n) * 60.0


def random_int(min_val, max_val):
    import random
    return random.randint(int(min_val), int(max_val))


def random_item(collection):
    import random
    return random.choice(list(collection))


def env_var(key, default=None):
    return _os.environ.get(str(key), default)


class _CryptoMod:
    @staticmethod
    def sha256(value):
        return seal_hash(value)

    @staticmethod
    def sha512(value):
        return hash_sha512(value)

    @staticmethod
    def md5(value):
        return hash_md5(value)

    @staticmethod
    def verify(value, expected_hex):
        return seal_hash(value) == str(expected_hex).lower()


crypto = _CryptoMod()


class DurableRecord:
    """Base mixin for sealed immutable records."""
    def __setattr__(self, name, value):
        if getattr(self, "_sealed_lock", False):
            raise ContinuityImmutabilityError(
                f"Cannot mutate sealed field '{name}' on durable record {self.__class__.__name__}"
            )
        super().__setattr__(name, value)

    def __post_init__(self):
        object.__setattr__(self, "_sealed_lock", True)

    def to_dict(self):
        return {
            f.name: getattr(self, f.name)
            for f in _dc.fields(self)
        }

    def odcs_hash(self):
        return seal_hash(self.to_dict())

    def to_json(self):
        return canonical_json(self.to_dict())


class PNCounter:
    """Conflict-Free Replicated Positive-Negative Counter."""
    def __init__(self, node_id="local-node"):
        self.node_id = node_id
        self.p = {node_id: 0}
        self.n = {}

    def inc(self, amount=1):
        self.p[self.node_id] = self.p.get(self.node_id, 0) + amount
        return self

    def dec(self, amount=1):
        self.n[self.node_id] = self.n.get(self.node_id, 0) + amount
        return self

    def merge(self, other):
        rp = other.p if hasattr(other, "p") else other
        rn = other.n if hasattr(other, "n") else {}
        for k, v in rp.items():
            self.p[k] = max(self.p.get(k, 0), v)
        for k, v in rn.items():
            self.n[k] = max(self.n.get(k, 0), v)
        return self

    def value(self):
        return sum(self.p.values()) - sum(self.n.values())


class ZeroIntentLoss:
    """Zero Intent Loss local receipt minter & staging log."""
    _receipts = []

    @classmethod
    def preserve(cls, action, payload=None, actor="haven-runtime"):
        record = {
            "intent_id": "zil_" + uuid7().replace("-", "")[:16],
            "actor": actor,
            "action": str(action),
            "payload": payload if payload is not None else {},
            "timestamp_ms": now_ms(),
            "status": "STAGED_TO_WAL",
        }
        record["receipt_hash"] = seal_hash(record)
        cls._receipts.append(record)
        return record

    @classmethod
    def receipts(cls):
        return list(cls._receipts)


class ContinuityLedger:
    """Append-only Merkle-chained ledger."""
    def __init__(self, uri="haven://local-wal"):
        self.uri = uri
        self.blocks = []
        self._append_raw({"event": "GENESIS", "uri": uri, "ts": now_ms()})

    @classmethod
    def open(cls, uri="haven://local-wal"):
        return cls(uri)

    def _append_raw(self, data):
        prev_hash = self.blocks[-1]["hash"] if self.blocks else "0" * 64
        payload = {"height": len(self.blocks), "prev_hash": prev_hash, "data": data}
        block_hash = seal_hash(payload)
        block = {"height": len(self.blocks), "prev_hash": prev_hash, "hash": block_hash, "data": data}
        self.blocks.append(block)
        return block

    def append(self, data):
        return self._append_raw(data)

    def current_height(self):
        return len(self.blocks)

    def height(self):
        return len(self.blocks)

    def last_block(self):
        return self.blocks[-1] if self.blocks else None

    def genesis_hash(self):
        return self.blocks[0]["hash"]

    def merkle_root(self):
        return merkle_root([b["hash"] for b in self.blocks])

    def to_json(self):
        return canonical_json(self.blocks)

    def checkpoint(self, record, label="CHECKPOINT"):
        rec_data = record.to_dict() if hasattr(record, "to_dict") else (_dc.asdict(record) if _dc.is_dataclass(record) else record)
        rec_hash = record.odcs_hash() if hasattr(record, "odcs_hash") else seal_hash(rec_data)
        return self.append({
            "type": "CHECKPOINT",
            "label": str(label),
            "record": rec_data,
            "hash": rec_hash,
            "sealed_at": now_ms()
        })

    def verify_integrity(self):
        for i, b in enumerate(self.blocks):
            expected_prev = self.blocks[i - 1]["hash"] if i > 0 else "0" * 64
            if b["prev_hash"] != expected_prev:
                return {"is_valid": False, "drift_height": i}
            recomputed = seal_hash({"height": b["height"], "prev_hash": b["prev_hash"], "data": b["data"]})
            if recomputed != b["hash"]:
                return {"is_valid": False, "drift_height": i}
        return {"is_valid": True, "height": len(self.blocks), "merkle_root": self.merkle_root()}


class TelemetryProbe:
    """Environmental Network & Health Adaptation helper."""
    @staticmethod
    def classify(rtt_ms, battery_pct=100):
        if rtt_ms < 0:
            return "AIRGAP_OFFLINE"
        if rtt_ms > 350 or battery_pct < 15:
            return "CONSTRAINED_JITTER"
        return "OPTIMAL_ONLINE"


true = True
false = False
nothing = None
'''


HAVEN_TYPE_MAP = {
    "String": "str",
    "Integer": "int",
    "Float": "float",
    "Boolean": "bool",
    "List": "list",
    "Map": "dict",
    "Dict": "dict",
    "Bytes": "bytes",
    "Any": "Any",
}


def _split_strings_and_code(text: str) -> List[Tuple[bool, str]]:
    """Split a source line into [(is_string_literal, chunk)] preserving quotes/escapes."""
    parts: List[Tuple[bool, str]] = []
    buf: List[str] = []
    i = 0
    n = len(text)
    in_quote: Optional[str] = None
    is_triple = False

    while i < n:
        ch = text[i]
        if in_quote is None:
            if ch == "/" and i + 1 < n and text[i + 1] == "/":
                break
            if ch == "#":
                buf.append(text[i:])
                break
            if ch in ('"', "'"):
                if text[i:i + 3] == ch * 3:
                    if buf:
                        parts.append((False, "".join(buf)))
                        buf = []
                    in_quote = ch
                    is_triple = True
                    buf.append(ch * 3)
                    i += 3
                    continue
                if buf:
                    parts.append((False, "".join(buf)))
                    buf = []
                in_quote = ch
                is_triple = False
                buf.append(ch)
                i += 1
                continue
            buf.append(ch)
            i += 1
        else:
            buf.append(ch)
            if ch == "\\" and i + 1 < n:
                buf.append(text[i + 1])
                i += 2
                continue
            if is_triple and text[i:i + 3] == in_quote * 3:
                buf.append(in_quote * 2)
                parts.append((True, "".join(buf)))
                buf = []
                in_quote = None
                is_triple = False
                i += 3
                continue
            if not is_triple and ch == in_quote:
                parts.append((True, "".join(buf)))
                buf = []
                in_quote = None
                i += 1
                continue
            i += 1

    if buf:
        parts.append((in_quote is not None, "".join(buf)))
    return parts


def _auto_interpolate_string(parts: List[Tuple[bool, str]]) -> List[Tuple[bool, str]]:
    """Convert Haven strings containing `{identifier}` into Python f-strings cleanly."""
    interp_re = re.compile(r"\{[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*|\[[^\]]+\]|\([^)]*\))*\}")
    out: List[Tuple[bool, str]] = []
    for idx, (is_str, chunk) in enumerate(parts):
        if is_str and interp_re.search(chunk):
            prev_code = out[-1][1] if out and not out[-1][0] else ""
            if not re.search(r"[frbuFRBU]+$", prev_code):
                out.append((True, "f" + chunk))
                continue
        out.append((is_str, chunk))
    return out


def _replace_english_ops(code_chunk: str) -> str:
    """Translate natural-English comparison and value keywords outside string literals."""
    replacements = [
        (r"\bis\s+greater\s+than\s+or\s+equal\s+to\b", ">="),
        (r"\bis\s+at\s+least\b", ">="),
        (r"\bis\s+less\s+than\s+or\s+equal\s+to\b", "<="),
        (r"\bis\s+at\s+most\b", "<="),
        (r"\bis\s+not\s+equal\s+to\b", "!="),
        (r"\bis\s+equal\s+to\b", "=="),
        (r"\bis\s+greater\s+than\b", ">"),
        (r"\bis\s+less\s+than\b", "<"),
        (r"\bis\s+not\s+in\b", "not in"),
        (r"\bis\s+in\b", "in"),
        (r"\btrue\b", "True"),
        (r"\bfalse\b", "False"),
        (r"\bnothing\b", "None"),
    ]
    res = code_chunk
    for pattern, target in replacements:
        res = re.sub(pattern, target, res)
    return res


def _convert_call_named_colons(expr: str) -> str:
    """Convert `fn(key: val, other: val2)` named args to Python `fn(key=val, other=val2)`."""
    out: List[str] = []
    stack: List[str] = []
    i = 0
    n = len(expr)
    in_q: Optional[str] = None

    while i < n:
        ch = expr[i]
        if in_q:
            out.append(ch)
            if ch == "\\" and i + 1 < n:
                out.append(expr[i + 1])
                i += 2
                continue
            if ch == in_q:
                in_q = None
            i += 1
            continue

        if ch == "#":
            end_nl = expr.find("\n", i)
            if end_nl == -1:
                out.append(expr[i:])
                break
            out.append(expr[i:end_nl])
            i = end_nl
            continue

        if ch in ('"', "'"):
            in_q = ch
            out.append(ch)
            i += 1
            continue

        if ch in "([{":
            stack.append(ch)
            out.append(ch)
            i += 1
            continue

        if ch in ")]}":
            if stack:
                stack.pop()
            out.append(ch)
            i += 1
            continue

        if stack and stack[-1] == "(":
            m_lam = re.match(r"lambda\b[^:\n]*:", expr[i:])
            if m_lam and (i == 0 or not (expr[i - 1].isalnum() or expr[i - 1] == "_")):
                out.append(m_lam.group(0))
                i += m_lam.end()
                continue
            m = re.match(r"([a-zA-Z_][a-zA-Z0-9_]*)\s*:(?!:)", expr[i:])
            if m and (i == 0 or not (expr[i - 1].isalnum() or expr[i - 1] == "_")):
                out.append(f"{m.group(1)}=")
                i += m.end()
                continue

        out.append(ch)
        i += 1

    return "".join(out)


def _rewrite_parts(line: str) -> str:
    """Apply string stripping (//), auto-interpolation, and English ops cleanly."""
    parts = _split_strings_and_code(line)
    parts = _auto_interpolate_string(parts)
    rebuilt: List[str] = []
    for is_str, chunk in parts:
        if is_str:
            rebuilt.append(chunk)
        else:
            rebuilt.append(_replace_english_ops(chunk))
    return "".join(rebuilt).rstrip()


def _split_outside_strings(expr: str, sep: str = "|>") -> List[str]:
    """Split expression by top-level separator outside strings/brackets."""
    segments: List[str] = []
    buf: List[str] = []
    depth = 0
    in_q: Optional[str] = None
    i = 0
    n = len(expr)

    while i < n:
        ch = expr[i]
        if in_q:
            buf.append(ch)
            if ch == "\\" and i + 1 < n:
                buf.append(expr[i + 1])
                i += 2
                continue
            if ch == in_q:
                in_q = None
            i += 1
            continue
        if ch in ('"', "'"):
            in_q = ch
            buf.append(ch)
            i += 1
            continue
        if ch in "([{":
            depth += 1
        elif ch in ")]}" and depth > 0:
            depth -= 1

        if depth == 0 and expr.startswith(sep, i):
            segments.append("".join(buf).strip())
            buf = []
            i += len(sep)
            continue

        buf.append(ch)
        i += 1

    segments.append("".join(buf).strip())
    return segments


def _split_outside_brackets(text: str, delimiter: str = ",") -> List[str]:
    """Split a comma list outside quotes/brackets."""
    parts: List[str] = []
    buf: List[str] = []
    depth = 0
    in_q: Optional[str] = None
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        if in_q:
            buf.append(ch)
            if ch == "\\" and i + 1 < n:
                buf.append(text[i + 1])
                i += 2
                continue
            if ch == in_q:
                in_q = None
            i += 1
            continue
        if ch in ('"', "'"):
            in_q = ch
            buf.append(ch)
            i += 1
            continue
        if ch in "([{":
            depth += 1
        elif ch in ")]}" and depth > 0:
            depth -= 1
        if depth == 0 and text.startswith(delimiter, i):
            parts.append("".join(buf).strip())
            buf = []
            i += len(delimiter)
            continue
        buf.append(ch)
        i += 1
    parts.append("".join(buf).strip())
    return parts


def _split_keyword_outside_strings(line: str, keyword: str) -> Optional[Tuple[str, str]]:
    """Find last occurrence of separator outside quotes/brackets."""
    depth = 0
    in_q: Optional[str] = None
    i = 0
    n = len(line)
    kw_re = re.compile(r"\s+\b" + re.escape(keyword.strip()) + r"\b\s+")
    last_match: Optional[Tuple[int, int]] = None

    while i < n:
        ch = line[i]
        if in_q:
            if ch == "\\" and i + 1 < n:
                i += 2
                continue
            if ch == in_q:
                in_q = None
            i += 1
            continue
        if ch in ('"', "'"):
            in_q = ch
            i += 1
            continue
        if ch in "([{":
            depth += 1
        elif ch in ")]}" and depth > 0:
            depth -= 1

        if depth == 0:
            m = kw_re.match(line[i:])
            if m:
                last_match = (i, i + m.end())
                i += m.end()
                continue
        i += 1

    if last_match is not None:
        start, end = last_match
        return line[:start].strip(), line[end:].strip()
    return None


def _build_when_condition(target_var: str, raw_pattern: str) -> str:
    """Compile pattern expression for `when <pattern>:` inside `inspect <var>`."""
    pat = raw_pattern.strip()
    comb_parts = re.split(r"\s+\b(and|or)\b\s+", pat)
    if len(comb_parts) > 1:
        built = []
        for token in comb_parts:
            if token in ("and", "or"):
                built.append(token)
            else:
                built.append(_build_when_condition(target_var, token))
        return f"({' '.join(built)})"

    if re.match(r"^(?:==|!=|<=|>=|<|>|\bin\b|\bis\b)", pat):
        return f"({target_var} {pat})"

    items = _split_outside_brackets(pat, ",")
    if len(items) > 1:
        return f"({target_var} in ({pat}))"

    return f"({target_var} == ({pat}))"


def _replace_or_else(expr: str) -> str:
    """Convert `a or else b` into `_haven_coalesce(a, b)` outside quotes."""
    if "or else" not in expr:
        return expr

    depth = 0
    in_q: Optional[str] = None
    i = 0
    n = len(expr)
    sep = "or else"
    split_pos: Optional[int] = None

    while i < n:
        ch = expr[i]
        if in_q:
            if ch == "\\" and i + 1 < n:
                i += 2
                continue
            if ch == in_q:
                in_q = None
            i += 1
            continue
        if ch in ('"', "'"):
            in_q = ch
            i += 1
            continue
        if ch in "([{":
            depth += 1
        elif ch in ")]}" and depth > 0:
            depth -= 1

        if depth == 0 and expr.startswith("or else", i):
            before_ok = (i == 0 or not expr[i - 1].isalnum())
            after_ok = (i + 7 >= n or not expr[i + 7].isalnum())
            if before_ok and after_ok:
                split_pos = i
                break
        i += 1

    if split_pos is not None:
        lhs = expr[:split_pos].strip()
        rhs = expr[split_pos + len(sep):].strip()
        return f"_haven_coalesce({_replace_or_else(lhs)}, {_replace_or_else(rhs)})"

    sub_expr = re.sub(
        r"\(([^()]+)\)",
        lambda m: f"({_replace_or_else(m.group(1))})" if "or else" in m.group(1) else m.group(0),
        expr,
    )
    if sub_expr != expr:
        return _replace_or_else(sub_expr)

    return expr


def _replace_copy_with(expr: str) -> str:
    """Lower `copy <record> with (...)` to `_dc.replace(<record>, ...)` for durable records."""
    return re.sub(r"\bcopy\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s+with\s*\(", r"_dc.replace(\1, ", expr)


def _substitute_placeholder(stage: str, lhs: str) -> str:
    """Substitute standalone `_` placeholder outside strings with `lhs`, or inject into call."""
    parts = _split_strings_and_code(stage)
    replaced_any = False
    new_parts: List[Tuple[bool, str]] = []
    for is_str, chunk in parts:
        if not is_str:
            updated, count = re.subn(r"(?<![a-zA-Z0-9_])_(?![a-zA-Z0-9_])", f"({lhs})", chunk)
            if count > 0:
                replaced_any = True
            new_parts.append((False, updated))
        else:
            new_parts.append((True, chunk))

    if replaced_any:
        return "".join(c for _, c in new_parts)

    m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_.]*)\((.*)\)$", stage.strip())
    if m:
        fn_name, args = m.group(1), m.group(2).strip()
        return f"{fn_name}({lhs}, {args})" if args else f"{fn_name}({lhs})"
    return f"{stage.strip()}({lhs})"


def _fold_nested_parens(expr: str) -> str:
    """Find each `(...)` that contains `|>` and fold inner expression properly."""
    out: List[str] = []
    i = 0
    n = len(expr)
    in_q: Optional[str] = None

    while i < n:
        ch = expr[i]
        if in_q:
            out.append(ch)
            if ch == "\\" and i + 1 < n:
                out.append(expr[i + 1])
                i += 2
                continue
            if ch == in_q:
                in_q = None
            i += 1
            continue
        if ch in ('"', "'"):
            in_q = ch
            out.append(ch)
            i += 1
            continue
        if ch == "(":
            depth = 1
            j = i + 1
            in_sub_q: Optional[str] = None
            while j < n and depth > 0:
                c = expr[j]
                if in_sub_q:
                    if c == "\\" and j + 1 < n:
                        j += 2
                        continue
                    if c == in_sub_q:
                        in_sub_q = None
                    j += 1
                    continue
                if c in ('"', "'"):
                    in_sub_q = c
                    j += 1
                    continue
                if c == "(":
                    depth += 1
                elif c == ")":
                    depth -= 1
                j += 1

            if depth == 0:
                inner = expr[i + 1:j - 1]
                if "|>" in inner:
                    folded_inner = _fold_nested_parens(inner)
                    out.append(f"({_fold_pipeline(folded_inner)})")
                else:
                    out.append(f"({inner})")
                i = j
                continue

        out.append(ch)
        i += 1

    return "".join(out)


def _fold_pipeline(expr: str) -> str:
    """Compile Haven pipeline chains (`a |> fn(_) |> show(_)`) left-to-right."""
    expr = _replace_copy_with(expr)
    if "|>" not in expr:
        return _replace_or_else(expr)
    expr = _fold_nested_parens(expr)
    if "|>" not in expr:
        return _replace_or_else(expr)
    stages = _split_outside_strings(expr, "|>")
    if len(stages) < 2:
        return _replace_or_else(expr)
    acc = _replace_or_else(stages[0])
    for stage in stages[1:]:
        if not stage:
            continue
        if stage in ("show", "say", "print", "show(_)", "say(_)", "print(_)"):
            acc = f"print({acc})"
        else:
            acc = _substitute_placeholder(_replace_or_else(stage), acc)
    return acc


def is_pure_python(source: str) -> bool:
    """Return True if the source parses cleanly as standard Python."""
    try:
        ast.parse(source)
        return True
    except SyntaxError:
        return False


def _preprocess_multiline_pipelines(lines: List[str]) -> List[str]:
    """Attach continuation lines starting with `|>` or `.` onto the preceding expression line."""
    merged: List[str] = []
    for raw in lines:
        stripped = raw.strip()
        if (stripped.startswith("|>") or stripped.startswith(".")) and merged:
            k = len(merged) - 1
            while k >= 0 and not merged[k].strip():
                k -= 1
            if k >= 0:
                merged[k] = merged[k].rstrip() + (" " if stripped.startswith("|>") else "") + stripped
                continue
        merged.append(raw)
    return merged


def transpile_haven(source: str, include_prelude: bool = True) -> str:
    """
    Transpile Haven (.hvn) Natural-English, Object-Oriented & Enterprise syntax to Python 3.
    """
    lines = _preprocess_multiline_pipelines(source.splitlines())
    out_lines: List[str] = []
    inspect_stack: List[Dict[str, Any]] = []
    i = 0
    n = len(lines)

    while i < n:
        raw_line = lines[i]
        indent_len = len(raw_line) - len(raw_line.lstrip(" "))
        cleaned = _rewrite_parts(raw_line).strip()

        if not cleaned:
            out_lines.append("")
            i += 1
            continue

        while inspect_stack and indent_len <= inspect_stack[-1]["base_indent"]:
            inspect_stack.pop()

        shift = sum(ctx["delta"] for ctx in inspect_stack)
        effective_indent_len = max(0, indent_len - shift)
        indent = " " * effective_indent_len

        if cleaned.startswith("#"):
            out_lines.append(indent + cleaned)
            i += 1
            continue

        # 1. Interfaces & Abstract Contracts: define interface Name: / define contract Name:
        m_iface = re.match(r"^(?:define\s+(?:interface|contract)|interface|contract)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*$", cleaned)
        if m_iface:
            out_lines.append(f"{indent}class {m_iface.group(1)}(_abc.ABC):")
            i += 1
            continue

        # 2. Type-Safe Enums: define enum Name:
        m_enum = re.match(r"^(?:define\s+enum|enum)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*$", cleaned)
        if m_enum:
            enum_name = m_enum.group(1)
            out_lines.append(f"{indent}class {enum_name}(_enum.Enum):")
            i += 1
            has_enum_fields = False
            while i < n:
                sub_raw = lines[i]
                sub_stripped = _rewrite_parts(sub_raw).strip()
                if not sub_stripped:
                    i += 1
                    continue
                sub_indent = len(sub_raw) - len(sub_raw.lstrip(" "))
                if sub_indent <= indent_len:
                    break
                if "=" in sub_stripped:
                    out_lines.append(f"{' ' * sub_indent}{sub_stripped}")
                    has_enum_fields = True
                else:
                    parts = [p.strip() for p in sub_stripped.split(",") if p.strip()]
                    for p in parts:
                        out_lines.append(f"{' ' * sub_indent}{p} = \"{p}\"")
                        has_enum_fields = True
                i += 1
            if not has_enum_fields:
                out_lines.append(f"{indent}    pass")
            continue

        # 3. Traits & Mixins: define trait Name:
        m_trait = re.match(r"^(?:define\s+trait|trait)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*$", cleaned)
        if m_trait:
            out_lines.append(f"{indent}class {m_trait.group(1)}:")
            i += 1
            continue

        # 4. Object-Oriented Class Definitions: define class Name / class Name(Base):
        m_cls = re.match(r"^(?:define\s+class|class)\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\([^\)]*\))?)\s*:\s*$", cleaned)
        if m_cls:
            out_lines.append(f"{indent}class {m_cls.group(1)}:")
            i += 1
            continue

        # 5. Durable Immutable Record Block
        m_rec = re.match(r"^durable\s+record\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*$", cleaned)
        if m_rec:
            rec_name = m_rec.group(1)
            out_lines.append(f"{indent}@_dc.dataclass(frozen=True)")
            out_lines.append(f"{indent}class {rec_name}(DurableRecord):")
            i += 1
            field_count = 0
            while i < n:
                sub_raw = lines[i]
                sub_stripped = _rewrite_parts(sub_raw).strip()
                if not sub_stripped:
                    i += 1
                    continue
                sub_indent = len(sub_raw) - len(sub_raw.lstrip(" "))
                if sub_indent <= indent_len:
                    break
                m_field = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([a-zA-Z_][a-zA-Z0-9_]*)(?:\s*=\s*(.+))?$", sub_stripped)
                if m_field:
                    f_name, f_type, f_def = m_field.group(1), m_field.group(2), m_field.group(3)
                    py_type = HAVEN_TYPE_MAP.get(f_type, f_type)
                    if f_def:
                        out_lines.append(f"{' ' * sub_indent}{f_name}: {py_type} = {f_def}")
                    else:
                        out_lines.append(f"{' ' * sub_indent}{f_name}: {py_type}")
                    field_count += 1
                else:
                    out_lines.append(f"{' ' * sub_indent}{sub_stripped}")
                i += 1
            if field_count == 0:
                out_lines.append(f"{indent}    pass")
            continue

        # 6. Virtual module import shims
        if re.match(r"^(?:from\s+(?:odcs|haven_ai|crypto)(?:\.[a-zA-Z0-9_]+)?\s+import|import\s+(?:crypto|odcs))\b", cleaned):
            out_lines.append(f"{indent}# [haven-builtin] {cleaned}")
            i += 1
            continue

        # 7. Function / Method Definitions with abstract & init support
        m_fn = re.match(r"^(?:define|to|task|function)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*)\)\s*:\s*(pass|\.\.\.)?$", cleaned)
        if m_fn:
            fn_name = m_fn.group(1)
            fn_args = m_fn.group(2)
            has_pass = bool(m_fn.group(3))
            if fn_name == "init":
                fn_name = "__init__"
            elif fn_name in ("to_string", "as_string"):
                fn_name = "__str__"
            if has_pass:
                out_lines.append(f"{indent}@_abc.abstractmethod")
                out_lines.append(f"{indent}def {fn_name}({fn_args}):")
                out_lines.append(f"{indent}    pass")
            else:
                out_lines.append(f"{indent}def {fn_name}({fn_args}):")
            i += 1
            continue

        # 8. Pattern Matching: inspect <expr>: and when <pattern>:
        m_inspect = re.match(r"^inspect\s+(.+)\s*:\s*$", cleaned)
        if m_inspect:
            var_name = f"_haven_inspect_{len(inspect_stack)}"
            target_expr = _fold_pipeline(m_inspect.group(1).strip())
            out_lines.append(f"{indent}{var_name} = {target_expr}")
            inspect_stack.append({"base_indent": indent_len, "var": var_name, "has_case": False, "delta": 0})
            i += 1
            continue

        m_when = re.match(r"^when\s+(.+)\s*:\s*$", cleaned)
        if m_when and inspect_stack and indent_len > inspect_stack[-1]["base_indent"]:
            ctx = inspect_stack[-1]
            if not ctx["has_case"]:
                ctx["delta"] = indent_len - ctx["base_indent"]
                effective_indent_len = max(0, indent_len - ctx["delta"])
                indent = " " * effective_indent_len
            kw = "if" if not ctx["has_case"] else "elif"
            ctx["has_case"] = True
            cond = _build_when_condition(ctx["var"], m_when.group(1).strip())
            out_lines.append(f"{indent}{kw} {cond}:")
            i += 1
            continue

        # 9. Control Flow & Loops
        if re.match(r"^repeat\s+(.+)\s+times\s*:\s*$", cleaned):
            count_expr = re.match(r"^repeat\s+(.+)\s+times\s*:\s*$", cleaned).group(1)
            out_lines.append(f"{indent}for iteration in range(1, int({count_expr}) + 1):")
            i += 1
            continue

        m_each = re.match(r"^for\s+each\s+(.+?)\s+in\s+(.+)\s*:\s*$", cleaned)
        if m_each:
            out_lines.append(f"{indent}for {m_each.group(1)} in {_fold_pipeline(m_each.group(2))}:")
            i += 1
            continue

        m_unless = re.match(r"^unless\s+(.+)\s*:\s*$", cleaned)
        if m_unless:
            out_lines.append(f"{indent}if not ({_fold_pipeline(m_unless.group(1))}):")
            i += 1
            continue

        m_until = re.match(r"^until\s+(.+)\s*:\s*$", cleaned)
        if m_until:
            out_lines.append(f"{indent}while not ({_fold_pipeline(m_until.group(1))}):")
            i += 1
            continue

        if re.match(r"^forever\s*:\s*$", cleaned):
            out_lines.append(f"{indent}while True:")
            i += 1
            continue

        if cleaned == "stop":
            out_lines.append(f"{indent}break")
            i += 1
            continue

        if cleaned == "skip":
            out_lines.append(f"{indent}continue")
            i += 1
            continue

        # Duration & Timers
        m_wait = re.match(
            r"^(?:wait|sleep)\s+(.+?)(?:\s+(milliseconds|millis|ms|seconds|second|sec|s|minutes|minute|min|m))?\s*$",
            cleaned,
            re.IGNORECASE,
        )
        if m_wait:
            val_expr = _fold_pipeline(m_wait.group(1).strip())
            unit = (m_wait.group(2) or "seconds").lower()
            if unit in ("milliseconds", "millis", "ms"):
                out_lines.append(f"{indent}_time.sleep(({val_expr}) / 1000.0)")
            elif unit in ("minutes", "minute", "min", "m"):
                out_lines.append(f"{indent}_time.sleep(({val_expr}) * 60.0)")
            else:
                out_lines.append(f"{indent}_time.sleep({val_expr})")
            i += 1
            continue

        # Invariants & Assertions: ensure / verify
        m_ensure = re.match(r"^(?:ensure|verify)\s+(.+?)(?:\s+(?:otherwise|because)\s+(.+))?$", cleaned)
        if m_ensure:
            cond_expr = _fold_pipeline(m_ensure.group(1).strip())
            msg_expr = m_ensure.group(2).strip() if m_ensure.group(2) else None
            out_lines.append(f"{indent}assert {cond_expr}, {msg_expr}" if msg_expr else f"{indent}assert {cond_expr}")
            i += 1
            continue

        m_elif = re.match(r"^(?:otherwise\s+if|or\s+whenever)\s+(.+)\s*:\s*$", cleaned)
        if m_elif:
            out_lines.append(f"{indent}elif {_fold_pipeline(m_elif.group(1))}:")
            i += 1
            continue

        m_if = re.match(r"^(?:whenever|when)\s+(.+)\s*:\s*$", cleaned)
        if m_if:
            out_lines.append(f"{indent}if {_fold_pipeline(m_if.group(1))}:")
            i += 1
            continue

        if re.match(r"^otherwise\s*:\s*$", cleaned):
            out_lines.append(f"{indent}else:")
            i += 1
            continue

        # 10. Error Handling
        m_err_as = re.match(r"^(?:on\s+error|recover)\s+as\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*$", cleaned)
        if m_err_as:
            out_lines.append(f"{indent}except Exception as {m_err_as.group(1)}:")
            i += 1
            continue

        if re.match(r"^(?:on\s+error|recover)\s*:\s*$", cleaned):
            out_lines.append(f"{indent}except Exception:")
            i += 1
            continue

        if re.match(r"^always\s*:\s*$", cleaned):
            out_lines.append(f"{indent}finally:")
            i += 1
            continue

        # 11. Checkpointing
        m_chk = re.match(r"^checkpoint\s+(.+?)(?:\s+as\s+(.+?))?\s+into\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*$", cleaned)
        if m_chk:
            rec_expr = _fold_pipeline(m_chk.group(1).strip())
            label_expr = m_chk.group(2).strip() if m_chk.group(2) else '"CHECKPOINT"'
            ledger_var = m_chk.group(3).strip()
            out_lines.append(f"{indent}{ledger_var}.checkpoint({rec_expr}, {label_expr})")
            i += 1
            continue

        # 12. Natural File I/O
        if cleaned.startswith("save "):
            split_res = _split_keyword_outside_strings(cleaned[5:], "to")
            if split_res:
                payload_str, dest_str = split_res
                payload_expr = _fold_pipeline(payload_str.strip())
                dest_expr = _fold_pipeline(dest_str.strip())
                out_lines.append(f"{indent}_haven_save_file({dest_expr}, {payload_expr})")
                i += 1
                continue

        if cleaned.startswith("append "):
            split_res = _split_keyword_outside_strings(cleaned[7:], "to")
            if split_res:
                payload_str, dest_str = split_res
                payload_expr = _fold_pipeline(payload_str.strip())
                dest_expr = _fold_pipeline(dest_str.strip())
                out_lines.append(f"{indent}_haven_append_file({dest_expr}, {payload_expr})")
                i += 1
                continue

        m_read = re.match(r"^read\s+text\s+from\s+(.+?)\s+as\s+([a-zA-Z_][a-zA-Z0-9_]*)$", cleaned)
        if m_read:
            src_expr = _fold_pipeline(m_read.group(1).strip())
            target_var = m_read.group(2).strip()
            out_lines.append(f"{indent}{target_var} = _haven_read_file({src_expr})")
            i += 1
            continue

        # 13. Natural English Assignments & Multi-variable Unpacking
        m_set = re.match(
            r"^(?:set\s+([a-zA-Z0-9_.,\s]+?)\s+to|let\s+([a-zA-Z0-9_.,\s]+?)\s+(?:be|=)|remember\s+([a-zA-Z0-9_.,\s]+?)\s+as)\s+(.+)$",
            cleaned,
        )
        if m_set:
            var_name = (m_set.group(1) or m_set.group(2) or m_set.group(3)).strip()
            rhs = _fold_pipeline(m_set.group(4))
            out_lines.append(f"{indent}{var_name} = {rhs}")
            i += 1
            continue

        m_inc = re.match(r"^increase\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s+by\s+(.+)$", cleaned)
        if m_inc:
            out_lines.append(f"{indent}{m_inc.group(1)} += {_fold_pipeline(m_inc.group(2))}")
            i += 1
            continue

        m_dec = re.match(r"^decrease\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s+by\s+(.+)$", cleaned)
        if m_dec:
            out_lines.append(f"{indent}{m_dec.group(1)} -= {_fold_pipeline(m_dec.group(2))}")
            i += 1
            continue

        # 14. Return / Give Back
        m_ret = re.match(r"^give\s+back(?:\s+(.+))?$", cleaned)
        if m_ret:
            expr = m_ret.group(1)
            if expr:
                out_lines.append(f"{indent}return {_fold_pipeline(expr)}")
            else:
                out_lines.append(f"{indent}return")
            i += 1
            continue

        # 15. Intent Preservation
        m_intent = re.match(
            r"^preserve\s+intent\s+(.+?)(?:\s+with\s+(.+?))?(?:\s+as\s+([a-zA-Z_][a-zA-Z0-9_]*))?$",
            cleaned,
        )
        if m_intent:
            act_expr = m_intent.group(1).strip()
            pay_expr = m_intent.group(2).strip() if m_intent.group(2) else "{}"
            target_var = m_intent.group(3) or "_last_receipt"
            out_lines.append(f"{indent}{target_var} = ZeroIntentLoss.preserve({act_expr}, {pay_expr})")
            i += 1
            continue

        # 16. Output: say / show / print
        m_say = re.match(r"^(?:say|show|print)\s+(.+)$", cleaned)
        if m_say and not cleaned.startswith("print("):
            inner = m_say.group(1).strip()
            out_lines.append(f"{indent}print({_fold_pipeline(inner)})")
            i += 1
            continue

        # 17. Fallback pipeline & expression
        out_lines.append(f"{indent}{_fold_pipeline(cleaned)}")
        i += 1

    body = _convert_call_named_colons("\n".join(out_lines))
    if include_prelude:
        return HAVEN_PRELUDE.lstrip() + "\n# --- Transpiled Haven User Program ---\n" + body + "\n"
    return body + "\n"


def format_haven_diagnostic(src: str, exc: SyntaxError, filename: str) -> str:
    """Render helpful compiler diagnostics with pointer and tips."""
    lines = src.splitlines()
    lineno = exc.lineno or 1
    col = exc.offset or 1
    err_line = lines[lineno - 1] if 0 <= lineno - 1 < len(lines) else ""
    pointer = " " * max(0, col - 1) + "^^^"
    suggestion = ""
    if "==" in err_line:
        suggestion = "\n  💡 Tip: Haven natural-English comparison is 'is equal to' (or '==')."
    elif "def " in err_line:
        suggestion = "\n  💡 Tip: Define Haven functions using 'define function_name(args):'."
    elif "=" in err_line and "set " not in err_line and "let " not in err_line and "remember " not in err_line:
        suggestion = "\n  💡 Tip: Assign variables in Haven using 'set var to val' or 'let var be val'."

    return (
        f"\n\033[91m[Haven SyntaxError]\033[0m in {filename} at line {lineno}, column {col}:\n"
        f"  {lineno:4d} | {err_line}\n"
        f"       | {pointer}\n"
        f"  Error: {exc.msg}{suggestion}\n"
    )


def execute_haven_file(path: str, show_compiled: bool = False) -> int:
    """Load, transpile, validate, and run a `.hvn` file."""
    with open(path, "r", encoding="utf-8") as fh:
        src = fh.read()
    compiled = transpile_haven(src, include_prelude=True)
    if show_compiled:
        print("=== COMPILED PYTHON TARGET ===")
        print(transpile_haven(src, include_prelude=False))
        print("=== EXECUTION OUTPUT ===")
    try:
        ast.parse(compiled)
    except SyntaxError as exc:
        print(format_haven_diagnostic(compiled, exc, path), file=sys.stderr)
        return 1
    ns: Dict[str, Any] = {"__name__": "__main__", "__file__": os.path.abspath(path)}
    exec(compile(compiled, path, "exec"), ns)
    return 0


def run_haven_tests(target_path: str = ".") -> int:
    """Discover and execute all Haven test scripts (.hvn) reporting test status and timing."""
    test_files = []
    if os.path.isfile(target_path):
        test_files = [target_path]
    elif os.path.isdir(target_path):
        for root, dirs, files in os.walk(target_path):
            dirs[:] = [d for d in dirs if d not in (".git", "node_modules", "dist", "build", "__pycache__")]
            for f in sorted(files):
                if f.endswith(".hvn"):
                    test_files.append(os.path.join(root, f))

    if not test_files:
        print(f"No Haven test suites (.hvn) found in '{target_path}'.")
        return 0

    print("============================================================")
    print(f"🧪 Haven Language v{HAVEN_VERSION} Automated Test Suite Runner")
    print(f"   Target: {target_path} | Discovered: {len(test_files)} suite(s)")
    print("============================================================")

    passed = 0
    failed = 0
    start_total = time.time()

    for test_file in test_files:
        t0 = time.time()
        try:
            with open(test_file, "r", encoding="utf-8") as fh:
                src = fh.read()
            compiled = transpile_haven(src, include_prelude=True)
            ast.parse(compiled)
            ns = {"__name__": "__main__", "__file__": os.path.abspath(test_file)}
            exec(compile(compiled, test_file, "exec"), ns)
            dt_ms = int((time.time() - t0) * 1000)
            print(f"  \033[92m✓ [PASS]\033[0m {test_file} ({dt_ms}ms)")
            passed += 1
        except Exception as exc:
            dt_ms = int((time.time() - t0) * 1000)
            print(f"  \033[91m✗ [FAIL]\033[0m {test_file} ({dt_ms}ms) -> {exc}")
            failed += 1

    total_ms = int((time.time() - start_total) * 1000)
    print("============================================================")
    status_color = "\033[92m" if failed == 0 else "\033[91m"
    print(f"{status_color}Test Results: {passed} passed, {failed} failed in {total_ms}ms\033[0m")
    return 0 if failed == 0 else 1


def scaffold_new_project(project_name: str) -> int:
    """Scaffold a professional enterprise Haven project."""
    base_dir = os.path.abspath(project_name)
    if os.path.exists(base_dir):
        print(f"\033[91m[Error]\033[0m Directory '{project_name}' already exists.")
        return 1

    src_dir = os.path.join(base_dir, "src")
    tests_dir = os.path.join(base_dir, "tests")
    os.makedirs(src_dir, exist_ok=True)
    os.makedirs(tests_dir, exist_ok=True)

    manifest = {
        "name": project_name,
        "version": "1.0.0",
        "description": f"Enterprise application authored in Haven Language v{HAVEN_VERSION}",
        "entry": "src/main.hvn",
        "test_target": "tests/",
        "author": "Haven Enterprise Architect",
        "license": "Apache-2.0",
        "haven_version": f">={HAVEN_VERSION}",
    }
    with open(os.path.join(base_dir, "haven.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

    main_code = textwrap.dedent(f"""\
        // {project_name} — Haven Language Enterprise Application
        // Authored in Haven v{HAVEN_VERSION} Natural-English Syntax

        say "============================================================"
        say "🕊️  {project_name.upper()} • ENTERPRISE SERVICE ONLINE"
        say "============================================================"

        define interface IOrderService:
            define create_order(self, customer, items): pass
            define calculate_total(self, items): pass

        define class OrderService(IOrderService):
            define init(self):
                set self.db to SqliteDatabase(":memory:")
                self.db.execute("CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT, total REAL)")

            define create_order(self, customer, items):
                set total to self.calculate_total(items)
                set order_id to self.db.insert("orders", {{"customer": customer, "total": total}})
                EventBus.emit("order.created", {{"id": order_id, "customer": customer, "total": total}})
                give back order_id

            define calculate_total(self, items):
                give back Stream(items).map(lambda i: i["price"] * i["qty"]).sum()

        // Register listener on event bus
        EventBus.on("order.created", lambda o: say(f"  [EventBus] Order #{{o['id']}} placed by {{o['customer']}} (${{o['total']}})"))

        set service to OrderService()
        set sample_items to [
            {{"item": "Laptop", "price": 1200.0, "qty": 1}},
            {{"item": "Mouse", "price": 45.0, "qty": 2}}
        ]
        set order_id to service.create_order("Acme Corp", sample_items)
        say "Application workflow completed successfully [Order #{{order_id}}]."
    """)
    with open(os.path.join(src_dir, "main.hvn"), "w", encoding="utf-8") as f:
        f.write(main_code)

    test_code = textwrap.dedent("""\
        // Automated Unit Tests for Haven Application
        say "Verifying application service integrity..."

        verify 2 + 2 is equal to 4 otherwise "Math assertion failed"
        set stream_sum to Stream([10, 20, 30]).filter(lambda x: x > 15).sum()
        verify stream_sum is equal to 50 otherwise "Stream filter/sum failed"

        say "All tests passed with 100% verification!"
    """)
    with open(os.path.join(tests_dir, "test_main.hvn"), "w", encoding="utf-8") as f:
        f.write(test_code)

    readme_content = textwrap.dedent(f"""\
        # {project_name}

        Enterprise application authored in **Haven Language v{HAVEN_VERSION} ({HAVEN_CODENAME})**.

        ## Getting Started

        ### Run the application:
        ```bash
        haven run src/main.hvn
        ```

        ### Run automated tests:
        ```bash
        haven test tests/
        ```

        ### Validate syntax (lint):
        ```bash
        haven lint src/main.hvn
        ```
    """)
    with open(os.path.join(base_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)

    with open(os.path.join(base_dir, ".gitignore"), "w", encoding="utf-8") as f:
        f.write("__pycache__/\n*.wal\n*.log\n*.tmp\n*.db\n")

    print(f"\033[92m✓ Successfully created Haven project:\033[0m {project_name}/")
    print(f"   • {project_name}/haven.json")
    print(f"   • {project_name}/src/main.hvn")
    print(f"   • {project_name}/tests/test_main.hvn")
    print(f"   • {project_name}/README.md")
    print(f"\nTo get started:\n  cd {project_name}\n  haven run src/main.hvn")
    return 0


def format_haven_source(file_path: str) -> int:
    """Format and clean up a Haven source code file."""
    if not os.path.isfile(file_path):
        print(f"\033[91m[Error]\033[0m File '{file_path}' not found.")
        return 1

    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    formatted_lines = []
    for line in lines:
        stripped = line.rstrip()
        formatted_lines.append(stripped + "\n" if stripped else "\n")

    content = "".join(formatted_lines).rstrip() + "\n"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\033[92m✓ [Formatted]\033[0m {file_path}")
    return 0


def print_system_info() -> int:
    """Print complete enterprise toolchain and system diagnostic report."""
    print("============================================================")
    print(f"🕊️  HAVEN PROGRAMMING LANGUAGE • RUNTIME SYSTEM REPORT")
    print("============================================================")
    print(f"  Language Version:   Haven v{HAVEN_VERSION} ({HAVEN_CODENAME})")
    print(f"  VM Runtime Engine:  Python {sys.version.split()[0]} ({platform.python_implementation()})")
    print(f"  Operating System:   {platform.system()} {platform.release()} ({platform.machine()})")
    print(f"  Platform Node:      {platform.node()}")
    print("------------------------------------------------------------")
    print("  Enterprise Standard Batteries (Zero-Dependency Built-ins):")
    print("    • Interfaces:     define interface / define contract with @abstractmethod")
    print("    • Enums:          define enum Priority: LOW, MEDIUM, HIGH, CRITICAL")
    print("    • Decorators:     @memoize, @retry, @timed, @singleton, @deprecated")
    print("    • Streams:        Stream(items).filter().map().sort().unique().to_list()")
    print("    • DI Container:   ServiceContainer.default().singleton() / resolve()")
    print("    • Event Bus:      EventBus.on(event, handler) / EventBus.emit(event, data)")
    print("    • Database:       SqliteDatabase with query(), insert(), query_one()")
    print("    • Async Concur:   async_task(fn), run_parallel(tasks), FutureTask")
    print("    • Templating:     render_template(tpl, context)")
    print("    • Math & Stats:   sqrt, power, sin, cos, clamp, mean, median, stdev, PI")
    print("    • HTTP & Web:     fetch_get, fetch_post, fetch_json")
    print("    • JSON & CSV:     parse_json, to_json, read_csv, write_csv")
    print("    • OS & Storage:   list_directory, file_exists, read_lines, execute_command")
    print("    • Date & Time:    current_date, current_time, format_timestamp, parse_date")
    print("    • Cryptography:   hash_sha256, hash_sha512, hash_md5, base64_encode/decode")
    print("    • Continuity:     ContinuityLedger, PNCounter, ZeroIntentLoss, seal_hash")
    print("------------------------------------------------------------")
    print("  CLI Commands:       run, compile, lint, test, repl, new, format, info")
    print("============================================================")
    return 0


def launch_haven_repl() -> int:
    """Launch interactive Haven command-line REPL with live evaluation and helper commands."""
    try:
        import readline
    except ImportError:
        pass

    print(f"\033[95m🕊️  Haven Language v{HAVEN_VERSION} Interactive REPL\033[0m")
    print(f"   Edition: {HAVEN_CODENAME} | Batteries: 100+ Enterprise Functions")
    print("   Type \033[93m:help\033[0m for cheatsheet, \033[93m:modules\033[0m for standard library, \033[93mexit\033[0m to quit.")
    print("------------------------------------------------------------")

    ns: Dict[str, Any] = {}
    exec(compile(HAVEN_PRELUDE, "<haven-prelude>", "exec"), ns)

    while True:
        try:
            line = input("\033[95mhaven\033[0m\033[90m>\033[0m ")
        except (EOFError, KeyboardInterrupt):
            print("\nExiting Haven REPL.")
            break

        stripped = line.strip()
        if not stripped:
            continue
        if stripped in ("exit", "quit", ":exit", ":quit"):
            print("Goodbye!")
            break
        if stripped == ":help":
            print(textwrap.dedent("""
                Haven Language v3.5 Enterprise Cheatsheet:
                  Interfaces:  define interface IService: define handle(self, x): pass
                  Enums:       define enum Role: ADMIN, MEMBER, GUEST
                  Decorators:  @memoize | @retry(attempts=3) | @timed | @singleton
                  Streams:     Stream([1, 2, 3]).map(lambda x: x * 10).to_list()
                  DI Box:      ServiceContainer.default().singleton("db", fn).resolve("db")
                  EventBus:    EventBus.on("log", fn) | EventBus.emit("log", "data")
                  Database:    set db to SqliteDatabase(":memory:") | db.query("SELECT 1")
                  Classes:     define class Task: define init(self, name): ...
                  Variables:   set name to "Alpha" | let port be 8080 | remember KEY as "val"
                  Mutations:   increase count by 1 | decrease quota by 5
                  Flow:        whenever x is greater than 10: ... otherwise: ...
                  Pattern:     inspect code: when 200, 201: ... otherwise: ...
                  Pipelines:   data |> filter_by(fn) |> map_by(fn) |> take_first(3) |> show
                  Records:     durable record Packet: ... | copy pkt with (status: "OK")
                  Checkpoint:  checkpoint pkt as "stage_1" into ledger
                  Durations:   wait 250 milliseconds | wait 2 seconds
                  Null-safe:   name or else "Guest"
                  Files:       save "data" to "f.txt" | read text from "f.txt" as content
                  REPL Meta:   :modules, :examples, :info, :clear, :reset, :exit
            """).strip())
            continue
        if stripped in (":modules", ":builtins"):
            print(textwrap.dedent("""
                Enterprise Modules & Batteries:
                  • OOP/Contract: define interface, define contract, define enum, define trait, define class
                  • Decorators:   @memoize, @retry, @timed, @singleton, @deprecated, @abstract
                  • Streams:      Stream, Collection (.filter, .map, .sort, .unique, .chunk, .reduce)
                  • Services/DI:  ServiceContainer (.singleton, .register, .resolve)
                  • Event Bus:    EventBus (.on, .emit, .clear)
                  • Database/SQL: SqliteDatabase (.execute, .query, .query_one, .insert)
                  • Async Tasks:  async_task, run_parallel, FutureTask
                  • Templates:    render_template("Hello {{name}}", context)
                  • Math/Stats:   sqrt, power, sin, cos, clamp, mean, median, stdev, range_of, PI
                  • Web/HTTP:     fetch_get, fetch_post, fetch_json
                  • Data/CSV:     parse_json, to_json, read_csv, write_csv
                  • File/OS:      current_directory, list_directory, file_exists, read_lines, execute_command
                  • Date/Time:    current_date, current_time, format_timestamp, parse_date, now_ms, now_iso
                  • Crypto:       hash_sha256, hash_sha512, hash_md5, base64_encode, base64_decode, seal_hash
                  • Regex/Text:   regex_match, regex_find_all, regex_replace, snake_case, camel_case, title_case
                  • Continuity:   ContinuityLedger, PNCounter, ZeroIntentLoss, MerkleRoot
            """).strip())
            continue
        if stripped == ":examples":
            print(textwrap.dedent("""
                Quick Interactive Snippets:
                  1. Stream([1, 2, 3, 4, 5]).filter(lambda x: x > 2).map(lambda x: x * 10).to_list()
                  2. define enum Status: PENDING, APPROVED, REJECTED
                  3. set db to SqliteDatabase(":memory:")
                     db.execute("CREATE TABLE t (id INT, v TEXT)")
                     db.insert("t", {"id": 1, "v": "hello"})
                     db.query("SELECT * FROM t")
                  4. render_template("Welcome, {{user}} to Haven v3.5!", {"user": "Architect"})
            """).strip())
            continue
        if stripped == ":info":
            print_system_info()
            continue
        if stripped == ":clear":
            os.system("cls" if os.name == "nt" else "clear")
            continue
        if stripped == ":reset":
            ns.clear()
            exec(compile(HAVEN_PRELUDE, "<haven-prelude>", "exec"), ns)
            print("\033[92mEnvironment reset.\033[0m")
            continue

        try:
            py = transpile_haven(line, include_prelude=False).strip()
            try:
                code_obj = compile(py, "<repl>", "eval")
                val = eval(code_obj, ns)
                if val is not None:
                    print(f"\033[96m➜\033[0m {repr(val)}")
            except SyntaxError:
                code_obj = compile(py, "<repl>", "exec")
                exec(code_obj, ns)
        except Exception as exc:
            print(f"\033[91m[Haven Error]\033[0m {exc}")

    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description=f"Haven Language v{HAVEN_VERSION} ({HAVEN_CODENAME}) Toolchain & VM"
    )
    parser.add_argument(
        "--version",
        "-v",
        action="version",
        version=f"Haven Language v{HAVEN_VERSION} ({HAVEN_CODENAME})",
    )
    sub = parser.add_subparsers(dest="cmd")

    p_run = sub.add_parser("run", help="Run a .hvn script")
    p_run.add_argument("file", help="Path to .hvn file")
    p_run.add_argument("--show-compiled", action="store_true", help="Print compiled Python before running")

    p_comp = sub.add_parser("compile", help="Transpile a .hvn script to Python")
    p_comp.add_argument("file", help="Path to .hvn file")

    p_lint = sub.add_parser("lint", help="Validate Haven syntax without executing")
    p_lint.add_argument("file", help="Path to .hvn file")

    sub.add_parser("repl", help="Launch interactive Haven REPL")

    p_test = sub.add_parser("test", help="Discover and execute Haven test suites")
    p_test.add_argument("target", nargs="?", default="heaven/examples", help="Target test directory or file")

    p_new = sub.add_parser("new", help="Scaffold a new professional enterprise Haven project")
    p_new.add_argument("name", help="Name of project to create")

    p_fmt = sub.add_parser("format", help="Format and clean up Haven source file")
    p_fmt.add_argument("file", help="Path to .hvn file to format")

    sub.add_parser("info", help="Print system and runtime diagnostic report")

    args, unknown = parser.parse_known_args()
    if args.cmd == "run":
        sys.argv = [args.file] + unknown
        return execute_haven_file(args.file, show_compiled=args.show_compiled)
    if args.cmd == "compile":
        with open(args.file, "r", encoding="utf-8") as fh:
            print(transpile_haven(fh.read(), include_prelude=False))
        return 0
    if args.cmd == "lint":
        with open(args.file, "r", encoding="utf-8") as fh:
            compiled = transpile_haven(fh.read(), include_prelude=True)
        try:
            ast.parse(compiled)
            print(f"\033[92m[OK]\033[0m {args.file} passed Haven v{HAVEN_VERSION} AST verification.")
            return 0
        except SyntaxError as exc:
            print(format_haven_diagnostic(compiled, exc, args.file), file=sys.stderr)
            return 1
    if args.cmd == "test":
        return run_haven_tests(args.target)
    if args.cmd == "new":
        return scaffold_new_project(args.name)
    if args.cmd == "format":
        return format_haven_source(args.file)
    if args.cmd == "info":
        return print_system_info()
    if args.cmd == "repl":
        return launch_haven_repl()

    parser.print_help()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
