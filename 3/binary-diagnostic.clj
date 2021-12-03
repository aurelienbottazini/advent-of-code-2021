(ns binary-diagnostic
  (:require [clojure.string :as str]
            [clojure.edn :as edn]))

(def example (str/split-lines (slurp "./example.txt")))
(def input (str/split-lines (slurp "./input.txt")))

;; part 1
(defn most-common [index data]
  (if (>= (reduce #(+ %1 (Character/digit (nth %2 index) 10)) 0 data) (/ (count data) 2))
    \1 \0))

(defn least-common [index data]
  (if (< (reduce #(+ %1 (Character/digit (nth %2 index) 10)) 0 data) (/ (count data) 2))
    \1 \0))

(defn rate [selector data]
  (Integer/parseInt
   (str/join
    (for [index (range 0 (count (first data)))] (selector index data)))
   2))

(defn gamma-rate [data] (rate most-common data))
(defn epsilon-rate [data] (rate least-common data))

(* (gamma-rate example) (epsilon-rate example))
(* (gamma-rate input) (epsilon-rate input))

;; part 2
(defn rating [selector position alist]
  (let [size (count alist)]
    (cond
      (= size 1) (Integer/parseInt (first alist) 2)
      :else (recur selector (+ 1 position) (filter #(= (nth % position) (selector position alist)) alist)))))

(defn oxygen-rating
  ([alist] (oxygen-rating 0 alist))
  ([position alist] (rating most-common 0 alist)))

(defn co2-rating
  ([alist] (co2-rating 0 alist))
  ([position alist] (rating least-common 0 alist)))

(* (oxygen-rating example) (co2-rating example))
(* (oxygen-rating input) (co2-rating input))
