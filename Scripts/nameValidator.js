/* nameValidator.js: 氏名の入力検証
*/

// 氏名入力欄を検証する関数。送信時の一括検証の一部として performBatchValidation() から呼び出される
// 氏名が無効な場合は false、有効な場合は true を返す
function validateName(inName)
{
    /* 以下の正規表現の説明:
        ^:              文字列の先頭
        [A-Za-z\s]:     英大文字・小文字・スペースのいずれかに一致
        +:              1文字以上の一致が必要（空文字列を除外）
        $:              文字列の末尾
    */
    const NAME_RULES = /^[A-Za-z\s]+$/

    // test メソッドは、引数として渡した文字列が正規表現に一致するかを判定する
    // 一致する場合は true、しない場合は false を返す
    if (NAME_RULES.test(inName) === false)
    {
        console.log(inName + " was not determined to be a valid name");
        
        return false
    }

    console.log(inName + " was determined to be a valid name");

    return true;
}
