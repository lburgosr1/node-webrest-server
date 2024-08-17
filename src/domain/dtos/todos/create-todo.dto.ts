

export class CreateTdoDto {
    private constructor(
        public readonly text: string
    ){}

    static create(props: {[key:string]: any}): [string?, CreateTdoDto?] {

        const { text } = props;

        if( !text ) return ['Text property is required', undefined];

        return [undefined, new CreateTdoDto(text)];
    }
}