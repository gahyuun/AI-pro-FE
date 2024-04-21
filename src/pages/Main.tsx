import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export default function Main() {
  return (
    <div className="flex h-[100vh]">
      <div className="w-[15%] bg-gray-100">AI-PRO란?</div>
      <div className="w-[85%]">
        <div className="flex flex-col px-[100px] py-[30px] gap-2">
          <Textarea placeholder="type your message" />
          <div className="self-end">
            <Button variant="default">Send</Button>
          </div>
        </div>
        <div className="h-[80%] px-[100px] py-[20px]">
          gpt의 답변은 아래와 같습니다. 이 리팩터링된 코드에서는 다음을 수행합니다. booleanValue 변수는 불리언 타입으로
          선언되었습니다. 부울 값 true를 나타내는 부울 리터럴인 true 값이 직접 할당됩니다. 그러면 booleanValue 값이
          콘솔에 출력됩니다.
        </div>
      </div>
    </div>
  );
}
