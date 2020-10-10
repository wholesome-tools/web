import React from "react";
import { PasswordGenerator, PasswordOptions, DefaultPasswordOptions } from '@wholesome/passwords';
import { TextField, Slider } from "@material-ui/core";
import styled from "styled-components";
import { PasswordAdvanced } from "./password-advanced";

const PasswordCreatorWrap = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem 0;

  .text {
    vertical-align: baseline;
    margin-right: 1rem;
    display: inline-block;
  }

  .label {
    input {
      vertical-align: baseline;
      padding: 3px 0;
    }
  }
`;

const StyledTextField = styled(TextField)`
  input {
    font-size: 1.5rem !important;
    text-align: center;
  }
`;

const PasswordComplexity = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    display: block;
  }
`;

const PasswordComplexityLabel = styled.div`
  flex: 0 0 100px;
  vertical-align: baseline;

  @media (max-width: 800px) {
    font-weight: bold;
    &:after {
      content: ":";
    }
  }
`;

const PasswordComplexityControl = styled.div`
  flex: 1;
  vertical-align: baseline;
  height: 25px;

  @media (max-width: 800px) {
    padding: .5rem 0;
  }
`;

const PasswordComplexityAdvanced = styled.div`
  flex: 0 0 100px;
  vertical-align: baseline;
  text-align: right;
`;

export interface PasswordGeneratorState {
  advanced: boolean;
  options: PasswordOptions;
  password: string;
  slider: number;
}

const SliderOptions = [
  {
    ...DefaultPasswordOptions,
    minLowercase: 0,
    minUppercase: 0,
    minNumber: 0,
    minSymbols: 0,
    length: 6,
    chunkSize: 2
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 0,
    length: 8,
    chunkSize: 2
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 1,
    length: 12,
    chunkSize: 3
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1,
    minSymbols: 1,
    length: 16,
    chunkSize: 4
  },
  {
    ...DefaultPasswordOptions,
    minLowercase: 1,
    minUppercase: 3,
    minNumber: 3,
    minSymbols: 3,
    length: 24,
    chunkSize: 0
  },
];

export class PasswordCreator extends React.Component<{}, PasswordGeneratorState> {
  public constructor(props: any) {
    super(props);
    const options = SliderOptions[2];
    const password = PasswordGenerator.generate(options);
    this.state = {
      advanced: false,
      options,
      password,
      slider: 2,
    };
  }

  public render() {
    const { password, slider, advanced, options } = this.state;
    return (
      <PasswordCreatorWrap>
        <StyledTextField value={password} fullWidth onFocus={this.onFocus} margin='none' />
        <PasswordComplexity>
          <PasswordComplexityLabel>
            Complexity
          </PasswordComplexityLabel>
          <PasswordComplexityControl>
            {!advanced && <Slider
              aria-labelledby="Password complexity"
              step={1}
              marks
              min={0}
              max={4}
              value={slider}
              onChange={this.onSliderChange}
            />}
          </PasswordComplexityControl>
          <PasswordComplexityAdvanced>
            <a href='#' onClick={this.toggleAdvanced}>{this.state.advanced ? 'Simple' : 'Advanced'}</a>
          </PasswordComplexityAdvanced>
        </PasswordComplexity>
        {advanced && <PasswordAdvanced
          options={options}
          onOptionTextChange={this.onOptionTextChange}
          onOptionCheckboxChange={this.onOptionCheckboxChange}
        />}
      </PasswordCreatorWrap>
    );
  }

  public onOptionCheckboxChange = (field: any) =>{
    const checked = field[1] > 0;
    const options = {
      ...this.state.options,
      [field[0]]: checked ? 0 : (field[3])
    };
    this.setState({
      options,
      password: PasswordGenerator.generate(options)
    });
  }

  public onOptionTextChange = (event: any, field: any) => {
    const options = {
      ...this.state.options,
      [field[0]]: event.target.value
    };
    this.setState({
      options,
      password: PasswordGenerator.generate(options)
    });
  }

  private toggleAdvanced = (event: any) => {
    event.preventDefault();

    // Reset options if switching back from advanced
    if (this.state.advanced) {
      const options = SliderOptions[this.state.slider];
      const password = PasswordGenerator.generate(options);
      this.setState({
        options,
        password,
        advanced: false
      });
    } else {
      this.setState({
        advanced: true
      });
    }
  }

  private onFocus = (event: any) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.setSelectionRange(0, target.value.length);
  }

  private onSliderChange = (event: any, slider: any) => {
    if (slider !== this.state.slider) {
      const options = SliderOptions[slider];
      this.setState({
        options,
        slider,
        password: PasswordGenerator.generate(options)
      });
    }
  }
}
