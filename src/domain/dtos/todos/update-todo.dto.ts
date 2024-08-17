

export class UpdateTodoDto {

    constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if(this.text) returnObj.text = this.text;
        if(this.completedAt) returnObj.completeAt = this.completedAt;

        return returnObj;
    }

    static update(props: {[key: string]: any}): [string?, UpdateTodoDto?] {

        const { id, text, completeAt } = props;
        let newCompletedAd = completeAt;

        if(!id || isNaN(Number(id))) {
            return ['id must be a valid number'];
        }
        
        if(completeAt) {
            newCompletedAd = new Date(completeAt);
            if(newCompletedAd.toString() === 'Invalid Date') {
                return ['CompleteAt must be a valid date'];
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAd)];
    }
}