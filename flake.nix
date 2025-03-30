{
  description = "jonsson-analytics website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: flake-utils.lib.eachDefaultSystem (system:
    let pkgs = nixpkgs.legacyPackages.${system};
    in with pkgs;
    {
      packages.default = pkgs.hello;
      devShells.default = with pkgs; mkShell {
        buildInputs = [
          nushell
          nodejs_22
          python3
        ] ++ (with nodePackages; [
          pnpm
          firebase-tools
        ]);
        shellHook = ''
        '';
      };
    }
  );
}