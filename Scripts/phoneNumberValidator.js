/* phoneNumberValidator.js: 電話番号の入力検証
*/

// 電話番号入力欄を検証する関数。送信時の一括検証の一部として performBatchValidation() から呼び出される
// 電話番号が無効な場合は false、有効な場合は true を返す
function validatePhoneNumber(inPhoneNumber)
{
    /* 電話番号ルールの説明
        以下のルールは、できるだけ多くの国の電話番号形式を許容しつつ、
        妥当な制約を設けることを目的として定義した:

            - 明示的に許可されない限り、数字のみ使用可能
                - 理由: 世界の電話番号の多くは数字のみで構成される。文字を含む場合も、
                         多くは数字を表すダイヤル表記である

            - 「+」は電話番号の先頭にのみ許可する
                - 理由: 国際番号付きの入力を想定。国番号は通常先頭の「+」で表す。
                         それ以外の位置での「+」は有効な電話番号に含まれないことが多い
            
            - 「-」は連続して並べず、かつ電話番号の先頭に置かない場合のみ許可する
                - 理由: 有効な電話番号が「-」で始まることは通常ない。また、
                         連続する「-」が含まれるケースも一般的ではない
            
            数字の桁数や「-」区切りの桁数に関するルールは設けていない。国や番号種別によって
            桁数・区切り方が異なるため、多様な形式を受け入れる目的であえて省略している
    */

    /* 以下の正規表現の説明:
        ^:              文字列の先頭
        \+?:            先頭に任意で付与できる「+」
        \d:             先頭（および任意の「+」の直後）の数字
        (-?\d+)*:       数字の塊と、その間に任意で1つずつ入る「-」
        $:              文字列の末尾
    */
    const PHONE_RULES = /^\+?\d(-?\d+)*$/;

    // 電話番号ルールに違反する場合は false、それ以外は true を返す
    if (PHONE_RULES.test(inPhoneNumber) === false)
    {
        console.log(inPhoneNumber + " was not determined to be a valid phone number");

        return false;
    }
    
    console.log(inPhoneNumber + " was determined to be a valid phone number");
    
    return true;
}
