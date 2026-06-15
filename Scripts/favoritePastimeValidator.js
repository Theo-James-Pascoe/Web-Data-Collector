/* favoritePastimeValidator.js: 趣味の入力検証
*/

// 趣味入力欄を検証する関数。送信時の一括検証の一部として performBatchValidation() から呼び出される
// 入力が無効な場合は false、有効な場合は true を返す
function validateFavoritePastime(pastime)
{
    /* 趣味入力ルールの説明:
        英字が3文字未満だと、内容が受け取り側に伝わりにくい。
        最低文字数は任意だが、3文字未満では趣味を表す語が少ないため、下限を3とした。
        
        例: 「食べる」が趣味の人は "eat" と入力すれば、読み手は eating を指していると推測できる。
        同じ内容でも3文字未満では十分に伝えにくい
    */

    /* 以下の正規表現の説明:
        [a-zA-Z]:              英大文字・小文字に一致
        g:                     最初の1件で止めず、すべてのマッチを取得（全局検索）
    */
    const PASTIME_RULE = /[a-zA-Z]/g;

    // 趣味入力ルールに一致する文字を抽出
    let ruleMatches = pastime.match(PASTIME_RULE);
    // 検出された英字数の初期値を 0 に設定
    let numberOfLetters = 0

    // 英字が見つかった場合は numberOfLetters に件数を設定
    // 見つからない場合は条件を満たさず false を返す
    if (ruleMatches != null)
    {
        numberOfLetters = ruleMatches.length;
    }

    // 趣味入力ルールを満たす場合は true、満たさない場合は false を返す
    if (numberOfLetters >= 3)
    {
        console.log(pastime + " was determined to be a valid pastime");

        return true;
    }

    console.log(pastime + " was not determined to be a valid pastime");

    return false;
}
