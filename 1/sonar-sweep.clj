(ns sonar-sweep
  (:require [clojure.string :as str]
            [clojure.edn :as edn]))

(def input (slurp "./input.txt"))

(count
 (filter #(apply < %)
              (partition 2 1
                         (map edn/read-string (str/split-lines input)))))

(count
 (filter #(apply < %)
              (partition 2 1
                         (map #(apply + %)
                              (partition 3 1
                                         (map edn/read-string (str/split-lines input)))))))
