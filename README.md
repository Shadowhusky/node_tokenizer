# node_tokenizer

tf.keras tokenizer implemented in nodejs

tf.keras.preprocessing.text.Tokenizer: https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/text/Tokenizer

## Install

You can install tf_node_tokenizer with npm

```bash
npm install --save tf_node_tokenizer
```
or with yarn

```bash
yarn add tf_node_tokenizer
```

## Usage

With `Tokenizer`

```jsx
const { Tokenizer } = require("tf_node_tokenizer");
const tokenizer = new Tokenizer({ num_words: 5, oov_token: "<unk>", });

const text = [
  "<start> Cake and frosting all over a face and hands tells a happy story.  <end>",
  "<start> A baby is feeding himself with his hands and is smeared with food. <end>",
  "<start> A baby eating pink dessert in a highchair <end>"
];

tokenizer.fitOnTexts(text);
tokenizer.textsToSequences(text);

```

With `Tokenizer`

```jsx

const { Tokenizer, tokenizerFromJson } = require("tf_node_tokenizer");
const tokenizer = new Tokenizer({ num_words: 5, oov_token: "<unk>", });

const text = [
  "<start> Cake and frosting all over a face and hands tells a happy story.  <end>",
  "<start> A baby is feeding himself with his hands and is smeared with food. <end>",
  "<start> A baby eating pink dessert in a highchair <end>",
];

tokenizer.fitOnTexts(text);

const json = tokenizer.toJson();

const tokenizer_ = tokenizerFromJson(json);

tokenizer_.fitOnTexts(text);

tokenizer_.textsToSequences(text);

// Output
// [
//   [
//      2,  9, 3, 10, 11, 12,
//      1, 13, 3,  5, 14,  1,
//     15, 16, 4
//   ],
//   [
//     2,  1, 6, 7, 17, 18,
//     8, 19, 5, 3,  7, 20,
//     8, 21, 4
//   ],
//   [
//      2,  1, 6, 22, 23,
//     24, 25, 1, 26,  4
//   ]
// ]

```


