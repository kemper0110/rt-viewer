import * as ToggleGroup from '@radix-ui/react-toggle-group';

export default function SearchParamList({params, onChoice, defaultValue}) {
        return(
        <ToggleGroup.Root
            className="ToggleGroup"
            type="single"
            defaultValue={defaultValue}
            aria-label="Параметр поиска"
            onValueChange={(param) => onChoice(param)}
        >
            {params.map(param => <ToggleGroup.Item className="ToggleGroupItem" value={param} aria-label={param}>{param}</ToggleGroup.Item>)}
        </ToggleGroup.Root>
    );
}