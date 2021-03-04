class Tokenizer {

  /**
   * Class Tokenizer
   * @param filters a string where each element is a character that will be filtered from the texts. The default is all punctuation, plus tabs and line breaks, minus the ' character.
   * @param num_words the maximum number of words to keep, based on word frequency. Only the most common num_words-1 words will be kept.
   * @param oov_token if given, it will be added to word_index and used to replace out-of-vocabulary words during text_to_sequence calls
   * @param lower boolean. Whether to convert the texts to lowercase.
   * @return tokenizer object
   */
  constructor(config = {}) {
    this.filters = config.filters || /[\\.,/#!$%^&*;:{}=\-_`~()]/g;
    this.num_words = parseInt(config.num_words) || null;
    this.oov_token = config.oov_token || "";
    this.lower = typeof config.lower === "undefined" ? true : config.lower;

    // Primary indexing methods. Word to index and index to word.
    this.word_index = {};
    this.index_word = {};

    // Keeping track of word counts
    this.word_counts = {};
  }

  cleanText(text) {
    if (this.lower) text = text.toLowerCase();
    return text
      .replace(this.filters, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");
  }

  fitOnTexts(texts) {
    texts.forEach((text) => {
      text = this.cleanText(text);
      text.forEach((word) => {
        this.word_counts[word] = (this.word_counts[word] || 0) + 1;
      });
    });

    // Create words vector according to frequency (high to low)
    let vec = Object.entries(this.word_counts).sort((a, b) => b[1] - a[1]);
    // if oov_token is provided, add it to word_index / index_word
    if (this.oov_token) vec.unshift([this.oov_token, 0]);
    // Assign to word_index / index_word
    vec.every(([word, number], i) => {
      this.word_index[word] = i + 1;
      this.index_word[i + 1] = word;
      return true;
    });
  }

  textsToSequences(texts) {
    // Only translate the top num_words(if provided) of words.
    return texts.map((text) =>
      this.cleanText(text).flatMap((word) =>
        this.word_index[word] &&
        (this.num_words === null || this.word_index[word] < this.num_words)
          ? this.word_index[word]
          : this.oov_token
          ? 1
          : []
      )
    );
  }

  toJson() {
    return JSON.stringify({
      word_index: this.word_index,
      index_word: this.index_word,
      word_counts: this.word_counts,
    });
  }
}

/**
 * Create tokenizer from Json string
 * @param json_string JSON string encoding a tokenizer configuration.
 */
function tokenizerFromJson(json_string) {
  const tokenizer = new Tokenizer();
  const js = JSON.parse(json_string);
  tokenizer.word_index = js.word_index;
  tokenizer.index_word = js.index_word;
  tokenizer.word_counts = js.word_counts;
  return tokenizer;
}

module.exports = { Tokenizer, tokenizerFromJson };
